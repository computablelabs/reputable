import * as ganache from 'ganache-cli'
import { increaseTime } from 'computable/dist/helpers'
import store from '../../src/redux/store'
import { participate, resetParticipants } from '../../src/redux/dispatchers/participant'
import { resetWebsocketAddress } from '../../src/redux/dispatchers/web3'
import { resetToken } from '../../src/redux/dispatchers/token'
import { resetVoting } from '../../src/redux/dispatchers/voting'
import { resetParameterizer } from '../../src/redux/dispatchers/parameterizer'
import { resetRegistry } from '../../src/redux/dispatchers/registry'
import { resetDll } from '../../src/redux/dispatchers/dll'
import { resetAttributeStore } from '../../src/redux/dispatchers/attribute-store'
import { setWebsocketAddress } from '../../src/redux/action-creators/web3'
import { deployToken, approve, transfer } from '../../src/redux/action-creators/token'
import { deployAttributeStore } from '../../src/redux/action-creators/attribute-store'
import { deployDll } from '../../src/redux/action-creators/dll'
import {
  deployRegistry,
  fetchListing,
  applyListing,
  challengeListing,
  updateListingStatus,
} from '../../src/redux/action-creators/registry'
import { deployParameterizer } from '../../src/redux/action-creators/parameterizer'
import { deployVoting } from '../../src/redux/action-creators/voting'
import { State, Listing, Challenge } from '../../src/interfaces'
import {
  getRegistryAddress,
  getListing,
  getChallenges,
  getChallenge,
} from '../../src/redux/selectors'
import { getWeb3, getProvider } from '../../src/initializers'
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

      participate('Admin, son of Pants', owner)

      // p11r will want a token deployed
      await store.dispatch(deployToken())
      // voting deploy demands that dll and attrStore be deployed
      await store.dispatch(deployDll())
      await store.dispatch(deployAttributeStore())
      await store.dispatch(deployVoting())
      await store.dispatch(deployParameterizer())
    })

    afterAll(() => {
      server.close()
      // tear it all down as the store is a singleton
      resetParticipants()
      resetWebsocketAddress()
      resetToken()
      resetDll()
      resetAttributeStore()
      resetVoting()
      resetParameterizer()
      resetRegistry()
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

      participate('Admin, son of Pants', owner)

      // p11r will want a token deployed
      await store.dispatch(deployToken())
      // voting deploy demands that dll and attrStore be deployed
      await store.dispatch(deployDll())
      await store.dispatch(deployAttributeStore())
      await store.dispatch(deployVoting())
      await store.dispatch(deployParameterizer({ applyStageLen }))

      const registryAddress = await store.dispatch(
        deployRegistry('the registry')
      )

      // transfer funds to the spender
      await store.dispatch(
        transfer({ to: user, amount: 100 * 1000 })
      )

      // approve the registry to spend on behalf of the spender
      await store.dispatch(
        approve({ address: registryAddress, amount: 100 * 1000, from: user })
      )
    })

    afterAll(() => {
      server.close()
      // tear it all down as the store is a singleton
      resetParticipants()
      resetWebsocketAddress()
      resetToken()
      resetDll()
      resetAttributeStore()
      resetVoting()
      resetParameterizer()
      resetRegistry()
    })

    describe('#fetchListing', () => {
      let listingHash: string
      const listing: string = 'listing'
      const data = { value: 'data value' }

      beforeEach(async () => {
        const txValues = await store.dispatch(
          applyListing({ listing, userAddress: user, deposit: 100, data })
        )

        listingHash = txValues.listingHash
      })

      it('fetchesd an existing listing from a registry', async () => {
        const listing: Listing = await store.dispatch(
          fetchListing(listingHash)
        )

        expect(listing.listingHash).toBe(listingHash)
      })
    })

    describe('#applyListing', () => {
      it('a listing to a registry', async () => {
        const listing: string = 'random listing'
        const data = { value: 'random data' }

        const txValues = await store.dispatch(
          applyListing({ listing, userAddress: user, deposit: 100, data })
        )

        const returnedListing: string = web3.utils.hexToUtf8(txValues.listingHash)
        expect(returnedListing).toBe(listing)
        expect(txValues.owner).toBe(user)
        expect(txValues.unstakedDeposit).toBe('100')
        expect(txValues.applicationExpiry).toBeGreaterThan(0)
        expect(txValues.data).toEqual(data)
      })
    })

    describe('#updateListingStatus', () => {
      let listingHash: string

      beforeEach(async () => {
        const listingValues = await createListing(user)
        listingHash = listingValues.listingHash
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
        const listingValues = await createListing(user)
        listingHash = listingValues.listingHash
      })

      it('creates a challenge against a listing', async () => {
        let state: State = store.getState()
        let listing: Listing = getListing(state, listingHash) as Listing
        let challenges: Challenge[] = getChallenges(state)

        expect(listing.challengeID).toBeUndefined()
        expect(challenges.length).toBe(0)

        await store.dispatch(challengeListing({ listingHash, userAddress: user }))

        state = store.getState()
        listing = getListing(state, listingHash) as Listing
        const { challengeID } = listing
        challenges = getChallenges(state)

        expect(challenges.length).toBe(1)
        expect(challengeID).not.toBeUndefined()

        const challenge: Challenge = getChallenge(state, challengeID as string) as Challenge

        expect(challenge.challengeID).toBe(challengeID as string)
        expect(challenge.address).toBe(user)
      })
    })
  })
})

