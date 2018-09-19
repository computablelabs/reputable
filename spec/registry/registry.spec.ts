import * as ganache from 'ganache-cli'
import { increaseTime } from 'computable/dist/helpers'
import store from '../../src/redux/store'
import { setWebsocketAddress, resetWebsocketAddress } from '../../src/redux/action-creators/web3'
import { addParticipant, resetParticipants } from '../../src/redux/action-creators/participants'
import { deployToken, resetToken, approve, transfer } from '../../src/redux/action-creators/token'
import { deployAttributeStore, resetAttributeStore } from '../../src/redux/action-creators/attribute-store'
import { deployDll, resetDll } from '../../src/redux/action-creators/dll'
import {
  deployRegistry,
  resetRegistry,
  fetchListing,
  applyListing,
  resetRegistryListings,
  challengeListing,
  updateListingStatus,
} from '../../src/redux/action-creators/registry'
import { deployParameterizer, resetParameterizer } from '../../src/redux/action-creators/parameterizer'
import { deployVoting, resetVoting } from '../../src/redux/action-creators/voting'
import Observer from '../../src/redux/observer'
import { Map, State, Listing, Challenge } from '../../src/interfaces'
import { getWeb3, getProvider } from '../../src/initializers'
import {
  getRegistryAddress,
  getListings,
  getListing,
  getChallenges,
  getChallenge,
} from '../../src/redux/selectors'
import { createListing } from '../helpers'

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
      server.close()
      // tear it all down as the store is a singleton
      await store.dispatch(resetParticipants())
      await store.dispatch(resetWebsocketAddress())
      await store.dispatch(resetToken())
      await store.dispatch(resetDll())
      await store.dispatch(resetAttributeStore())
      await store.dispatch(resetVoting())
      await store.dispatch(resetParameterizer())
      await store.dispatch(resetRegistry())
    })

    beforeEach(async () => {
      await Observer.subscribe({ dispatch: store.dispatch, getState: store.getState })
    })

    afterEach(async () => {
      await Observer.unsubscribe()
    })

    it('begins with unhydrated registry', () => {
      const state: State = store.getState()
      const registryAddress: string = getRegistryAddress(state)

      expect(registryAddress).toBeFalsy()
    })

    it('deploys the registry contract, placing address in the state tree', async () => {
      // that the actual ws->redux events are working...
      // const deployListener = (reg:Registry) => { console.log(reg) },
        // unsub:any = subscriber(deployListener, registry)

      await store.dispatch(deployRegistry('the registry'))

      const state: State = store.getState()
      const registryAddress: string = getRegistryAddress(state)

      expect(registryAddress).toBeTruthy()
      // hashed addresses are always 42 chars
      expect(registryAddress && registryAddress.length).toBe(42)
    })
  })

  describe('with a deployed registry', () => {
    const port: number = 8448
    const websocketAddress: string = `ws://localhost:${port}`
    const applyStageLen = 60

    let server: any
    let web3: any
    let provider: any
    let accounts: string[]
    let owner: string
    let user: string

    beforeAll(async () => {
      server = ganache.server({ ws:true })
      server.listen(port)

      store.dispatch(setWebsocketAddress(websocketAddress))
      web3 = getWeb3(websocketAddress, { force: true })
      provider = getProvider()
      accounts = await web3.eth.getAccounts()

      owner = accounts[0]
      user = accounts[1]

      await store.dispatch(
        addParticipant('Admin, son of Pants', owner)
      )

      // p11r will want a token deployed
      await store.dispatch(deployToken())
      // voting deploy demands that dll and attrStore be deployed
      await store.dispatch(deployDll())
      await store.dispatch(deployAttributeStore())
      await store.dispatch(deployVoting())
      await store.dispatch(deployParameterizer({ applyStageLen }))
      await store.dispatch(deployRegistry('the registry'))

      const state: State = store.getState()
      const registryAddress: string = getRegistryAddress(state)

      // transfer funds to the spender
      await store.dispatch(
        transfer({ to: user, amount: 100 * 1000 })
      )

      // approve the registry to spend on behalf of the spender
      await store.dispatch(
        approve({ address: registryAddress, amount: 100 * 1000, from: user })
      )
    })

    afterAll(async () => {
      server.close()
      // tear it all down as the store is a singleton
      await store.dispatch(resetParticipants())
      await store.dispatch(resetWebsocketAddress())
      await store.dispatch(resetToken())
      await store.dispatch(resetDll())
      await store.dispatch(resetAttributeStore())
      await store.dispatch(resetVoting())
      await store.dispatch(resetParameterizer())
      await store.dispatch(resetRegistry())
    })

    beforeEach(async () => {
      await Observer.subscribe({ dispatch: store.dispatch, getState: store.getState })
    })

    afterEach(async () => {
      await Observer.unsubscribe()
    })

    describe('#fetchListing', () => {
      let listingHash: string

      beforeEach(async () => {
        const listingValues: Map = await createListing(user)
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
          applyListing({ listing: listingValue, userAddress: user, deposit: 100, data })
        )

        const state: State = store.getState()
        const listings: Listing[] = getListings(state)
        const listing: Listing = listings[0]
        const returnedListingValue: string = web3.utils.hexToUtf8(listing.listingHash)

        expect(returnedListingValue).toBe(listingValue)
        expect(listing.owner).toBe(user)
        expect(listing.unstakedDeposit).toBe('100')
        expect(listing.applicationExpiry).toBeGreaterThan(0)
        expect(listing.data).toEqual(data)
      })
    })

    describe('#updateListingStatus', () => {
      let listingHash: string

      beforeEach(async () => {
        const listingValues: Map = await createListing(user)
        listingHash = listingValues.listingHash
      })

      afterEach(async () => {
        await store.dispatch(resetRegistryListings())
      })

      it('whitelists a listing', async () => {
        let state: State = store.getState()
        let listing: Listing|undefined = getListing(state, listingHash)

        expect(listing && listing.whitelisted).toBe(false)

        await increaseTime(provider, applyStageLen + 1)

        await store.dispatch(
          updateListingStatus(listingHash)
        )

        state = store.getState()
        listing = getListing(state, listingHash)

        expect(listing && listing.whitelisted).toBe(true)
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
        const listingValues: Map = await createListing(user)
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

        await store.dispatch(challengeListing({ listingHash, userAddress: user }))

        state = store.getState()
        listing = getListing(state, listingHash) as Listing
        const { challenge: challengeID } = listing

        challenges = getChallenges(state)

        expect(challenges.length).toBe(1)
        expect(challengeID).not.toBeUndefined()

        const challenge: Challenge = getChallenge(state, challengeID as string) as Challenge

        expect(challenge.id).toBe(challengeID as string)
        expect(challenge.challenger).toBe(user)
      })
    })
  })
})

