// Local Dependencies
import { Map, State, Participant } from '../../interfaces'
import { ContractEvents } from '../../constants'
import store from '../store'
import { deployContracts, resetContracts } from '../../../spec/helpers'
import { approve } from '../action-creators'
import { getParticipants, getRegistryAddress } from '../selectors'
import ContractObserver from '.'

describe('contract observer', () => {
  beforeAll(async function(this: Map) {
    this.server = await deployContracts(store)

    const state: State = store.getState()

    const participants: Participant[] = getParticipants(state)
    this.owner = participants[0]
    this.user  = participants[1]
  })

  afterAll(async function(this: Map) {
    await resetContracts(store, this.server)
  })

  beforeEach(async function(this: Map) {
    await ContractObserver.subscribe(store.dispatch, store.getState)
  })

  afterEach(async function(this: Map) {
    await ContractObserver.unsubscribe()
  })

  describe('an event responder', () => {
    it('triggers for a matching event', async function(this: Map) {
      const state: State = store.getState()
      const registryAddress = getRegistryAddress(state)

      const responder = jasmine.createSpy()
      ContractObserver.registerResponder(ContractEvents.APPROVAL_EVENT, responder)

      await store.dispatch(
        approve({
          address: registryAddress,
          amount: 10,
          from: this.user.address,
        })
      )

      expect(responder.calls.count()).toEqual(1)
    })

    it('does not trigger for a non-matching event', async function(this: Map) {
      const state: State = store.getState()
      const registryAddress = getRegistryAddress(state)

      const responder = jasmine.createSpy()
      ContractObserver.registerResponder(ContractEvents.APPLICATION_EVENT, responder)

      await store.dispatch(
        approve({
          address: registryAddress,
          amount: 10,
          from: this.user.address,
        })
      )

      expect(responder.calls.count()).toEqual(0)
    })

    it('does not trigger if it is unregistered', async function(this: Map) {
      const state: State = store.getState()
      const registryAddress = getRegistryAddress(state)

      const responder = jasmine.createSpy()
      const responderId = ContractObserver.registerResponder(
        ContractEvents.APPROVAL_EVENT,
        responder,
      )
      ContractObserver.unregisterResponder(responderId)

      await store.dispatch(
        approve({
          address: registryAddress,
          amount: 10,
          from: this.user.address,
        })
      )

      expect(responder.calls.count()).toEqual(0)
    })
  })

  describe('an event callback', () => {
    it('triggers for a matching request ID', async function(this: Map) {
      const state: State = store.getState()
      const registryAddress = getRegistryAddress(state)

      const responder = jasmine.createSpy()

      const tx = await store.dispatch(
        approve({
          address: registryAddress,
          amount: 10,
          from: this.user.address,
        })
      )

      ContractObserver.registerCallback(
        ContractEvents.APPLICATION_EVENT,
        tx.transactionHash,
        responder,
      )

      expect(responder.calls.count()).toEqual(1)
    })

    it('triggers immediately if a request has already completed', async function(this: Map) {
      const state: State = store.getState()
      const registryAddress = getRegistryAddress(state)

      const responder = jasmine.createSpy()
      const registerSpyResponder = (log: Map) => {
        ContractObserver.registerCallback(
          ContractEvents.APPROVAL_EVENT,
          log.transactionHash,
          responder,
        )
      }

      const tx = await store.dispatch(
        approve({
          address: registryAddress,
          amount: 10,
          from: this.user.address,
        })
      )

      ContractObserver.registerCallback(
        ContractEvents.APPROVAL_EVENT,
        tx.transactionHash,
        registerSpyResponder,
      )

      expect(responder.calls.count()).toEqual(1)
    })

    it('does not trigger for a non-matching request ID', async function(this: Map) {
      const state: State = store.getState()
      const registryAddress = getRegistryAddress(state)

      const responder = jasmine.createSpy()

      await store.dispatch(
        approve({
          address: registryAddress,
          amount: 10,
          from: this.user.address,
        })
      )

      ContractObserver.registerCallback(
        ContractEvents.APPLICATION_EVENT,
        'non-matching transaction hash',
        responder,
      )

      expect(responder.calls.count()).toEqual(0)
    })
  })
})

