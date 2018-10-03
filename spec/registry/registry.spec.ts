// Dependencies
import * as ganache from 'ganache-cli'
import { increaseTime } from 'computable/dist/helpers'

// Local Dependencies
import store from '../../src/redux/store'
import { setWebsocketAddress } from '../../src/redux/action-creators/web3'
import { addParticipant } from '../../src/redux/action-creators/participants'
import { deployToken, approve, transfer } from '../../src/redux/action-creators/token'
import { deployAttributeStore } from '../../src/redux/action-creators/attribute-store'
import { deployDll } from '../../src/redux/action-creators/dll'
import {
  deployRegistry,
  fetchListing,
  applyListing,
  resetRegistryListings,
  challengeListing,
  updateListingStatus,
} from '../../src/redux/action-creators/registry'
import { deployParameterizer } from '../../src/redux/action-creators/parameterizer'
import { deployVoting } from '../../src/redux/action-creators/voting'
import ContractObserver from '../../src/redux/observer'
import { Map, State, Listing, Challenge, Participant } from '../../src/interfaces'
import { getWeb3, getProvider } from '../../src/initializers'
import {
  getWebsocketAddress,
  getParticipants,
  getRegistryAddress,
  getListings,
  getListing,
  getChallenges,
  getChallenge,
} from '../../src/redux/selectors'
import { deployContracts, resetContracts, createListing } from '../helpers'

describe('registry state', () => {
  describe('#deploy', () => {
    const port: number = 8447
    const websocketAddress: string = `ws://localhost:${port}`

    let server: any
    let accounts: string[]
    let owner: string

    beforeAll(async () => {
      server = ganache.server({ ws:true })
      server.listen(port)

      store.dispatch(setWebsocketAddress(websocketAddress))
      const web3 = getWeb3(websocketAddress, { force: true })
      accounts = await web3.eth.getAccounts()
      owner = accounts[0]

      await store.dispatch(
        addParticipant('Admin, son of Pants', owner)
      )

      // p11r will want a token deployed
      await store.dispatch(deployToken())
      // voting deploy demands that dll and attrStore be deployed
      await store.dispatch(deployDll())
      await store.dispatch(deployAttributeStore())
      await store.dispatch(deployVoting())
      await store.dispatch(deployParameterizer())
    })

    afterAll(async () => {
      await resetContracts(store, server)
    })

    it('begins with unhydrated registry', () => {
      const state: State = store.getState()
      const registryAddress: string = getRegistryAddress(state)

      expect(registryAddress).toBeFalsy()
    })

    it('deploys the registry contract, placing address in the state tree', async () => {
      await store.dispatch(deployRegistry('the registry'))

      const state: State = store.getState()
      const registryAddress: string = getRegistryAddress(state)

      expect(registryAddress).toBeTruthy()
      // hashed addresses are always 42 chars
      expect(registryAddress && registryAddress.length).toBe(42)
    })
  })

  describe('with a deployed registry', () => {
    const APPLY_STAGE_LEN = 60

    let server: any
    let web3: any
    let provider: any
    let participants: Participant[]
    let user: Participant

    beforeAll(async () => {
      server = await deployContracts(store)

      const state: State = store.getState()

      const websocketAddress: string = getWebsocketAddress(state)
      web3 = getWeb3(websocketAddress, { force: true })
      provider = getProvider()

      participants = getParticipants(state)
      user = participants[1]

      const registryAddress: string = getRegistryAddress(state)

      // transfer funds to the spender
      await store.dispatch(
        transfer({ to: user.address, amount: 100 * 1000 })
      )

      // approve the registry to spend on behalf of the spender
      await store.dispatch(
        approve({ address: registryAddress, amount: 100 * 1000, from: user.address })
      )
    })

    afterAll(async () => {
      await resetContracts(store, server)
    })

    beforeEach(async () => {
      await ContractObserver.subscribe(store.dispatch, store.getState)
    })

    afterEach(async () => {
      await ContractObserver.unsubscribe()
    })

    describe('#fetchListing', () => {
      let listingHash: string

      beforeEach(async () => {
        const listingValues: Map = await createListing(user.address)
        listingHash = listingValues.listingHash
      })

      afterEach(async () => {
        await store.dispatch(resetRegistryListings())
      })

      it('fetches an existing listing from a registry', async () => {
        await store.dispatch(
          fetchListing(listingHash)
        )

        const state: State = store.getState()
        const listing: Listing|undefined = getListing(state, listingHash)

        expect(listing && listing.listingHash).toEqual(listingHash)
      })
    })

    describe('#applyListing', () => {
      afterEach(async () => {
        await store.dispatch(resetRegistryListings())
      })

      it('applies a listing to a registry', async () => {
        const listingValue: string = 'random listing'
        const data = { value: 'random data' }

        await store.dispatch(
          applyListing({ listing: listingValue, userAddress: user.address, deposit: 100, data })
        )

        const state: State = store.getState()
        const listings: Listing[] = getListings(state)
        const listing: Listing = listings[0]
        const returnedListingValue: string = web3.utils.hexToUtf8(listing.listingHash)

        expect(returnedListingValue).toBe(listingValue)
        expect(listing.owner).toBe(user.address)
        expect(listing.unstakedDeposit).toBe('100')
        expect(listing.applicationExpiry).toBeGreaterThan(0)
        expect(listing.data).toEqual(data)
      })
    })

    describe('#updateListingStatus', () => {
      let listingHash: string

      beforeEach(async () => {
        const listingValues: Map = await createListing(user.address)
        listingHash = listingValues.listingHash
      })

      afterEach(async () => {
        await store.dispatch(resetRegistryListings())
      })

      it('whitelists a listing', async () => {
        let state: State = store.getState()
        let listing: Listing = getListing(state, listingHash) as Listing

        expect(listing.whitelisted).toBe(false)

        await increaseTime(provider, APPLY_STAGE_LEN + 1)

        await store.dispatch(
          updateListingStatus(listingHash)
        )

        state = store.getState()
        listing = getListing(state, listingHash) as Listing

        expect(listing.whitelisted).toBe(true)
      })

      it('does not whitelist a listing if applicant expiry has not occured', async () => {
        let state: State = store.getState()
        let listing: Listing|undefined = getListing(state, listingHash)

        expect(listing && listing.whitelisted).toBe(false)

        await store.dispatch(
          updateListingStatus(listingHash)
        )

        state = store.getState()
        listing = getListing(state, listingHash)

        expect(listing && listing.whitelisted).toBe(false)
      })
    })

    describe('#challenge', () => {
      let listingHash: string

      beforeEach(async () => {
        const listingValues: Map = await createListing(user.address)
        listingHash = listingValues.listingHash
      })

      afterEach(async () => {
        await store.dispatch(resetRegistryListings())
      })

      it('creates a challenge against a listing', async () => {
        let state: State = store.getState()
        let listing: Listing = getListing(state, listingHash) as Listing
        let challenges: Challenge[] = getChallenges(state)

        expect(listing.challenge).toBeUndefined()
        expect(challenges.length).toBe(0)

        await store.dispatch(challengeListing({ listingHash, userAddress: user.address }))

        state = store.getState()
        listing = getListing(state, listingHash) as Listing
        const { challenge: challengeID } = listing

        challenges = getChallenges(state)

        expect(challenges.length).toBe(1)
        expect(challengeID).not.toBeUndefined()

        const challenge: Challenge = getChallenge(state, challengeID as string) as Challenge

        expect(challenge.id).toBe(challengeID as string)
        expect(challenge.challenger).toBe(user.address)
      })
    })
  })
})

