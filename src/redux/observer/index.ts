// Dependencies
import UUID from 'uuid/v4'

// Local Dependencies
import { EventEmitter, EventLog, Map } from '../../interfaces'
import { ContractEvents } from '../../constants'
import {
  getRegistryContract,
  getTokenContract,
  getVotingContract,
} from '../contracts'
import { observerError } from '../action-creators/observer'
import {
  applicationEventResponder,
  applicationWhitelistedEventResponder,
  listingRemovedEventResponder,
  challengeEventResponder,
  challengeSucceededEventResponder,
  challengeFailedEventResponder,
  approvalEventResponder,
  transferEventResponder,
  votingRightsGrantedEventResponder,
  voteCommittedEventResponder,
} from './responders'

class ContractObserver {
  private contracts: Map  = {}
  private emitters: Map   = {}
  private requests: Map   = {}
  private responders: Map = {}
  private callbacks: Map  = {}

  constructor() {
    this.respondToContractEvent = this.respondToContractEvent.bind(this)
  }

  private async cacheContracts(dispatch: Function, getState: Function): Promise<void> {
    const state = getState()

    try {
      // TODO(geoff) refactor for concurrency
      this.contracts.registry = await getRegistryContract(state)
      this.contracts.token    = await getTokenContract(state)
      this.contracts.voting   = await getVotingContract(state)
    } catch (err) {
      dispatch(observerError(err))
    }
  }

  private registerContractEvents(): void {
    this.registerContractEvent(
      this.contracts.registry,
      ContractEvents.APPLICATION_EVENT,
    )

    this.registerContractEvent(
      this.contracts.registry,
      ContractEvents.APPLICATION_WHITELISTED_EVENT,
    )

    this.registerContractEvent(
      this.contracts.registry,
      ContractEvents.APPLICATION_REMOVED_EVENT,
    )

    this.registerContractEvent(
      this.contracts.registry,
      ContractEvents.LISTING_REMOVED_EVENT,
    )

    this.registerContractEvent(
      this.contracts.registry,
      ContractEvents.CHALLENGE_EVENT,
    )

    this.registerContractEvent(
      this.contracts.registry,
      ContractEvents.CHALLENGE_SUCCEEDED_EVENT,
    )

    this.registerContractEvent(
      this.contracts.registry,
      ContractEvents.CHALLENGE_FAILED_EVENT,
    )

    this.registerContractEvent(
      this.contracts.token,
      ContractEvents.APPROVAL_EVENT,
    )

    this.registerContractEvent(
      this.contracts.token,
      ContractEvents.TRANSFER_EVENT,
    )

    this.registerContractEvent(
      this.contracts.voting,
      ContractEvents.VOTING_RIGHTS_GRANTED_EVENT,
    )

    this.registerContractEvent(
      this.contracts.voting,
      ContractEvents.VOTE_COMMITTED_EVENT,
    )
  }

  private registerContractEvent(contract: any, eventName: string): void {
    const emitter = contract.getEventEmitter(eventName) as EventEmitter
    this.emitters[eventName] = emitter
    emitter.on('data', this.respondToContractEvent)
  }

  private respondToContractEvent(log: EventLog): void {
    const eventName: string = log.event
    const txHash: string = log.transactionHash

    // track the completed request
    this.requests[txHash] = log

    // trigger event responders
    Object.values(this.responders)
      .filter((responder: Map) => responder.eventName === eventName)
      .forEach((responder) => responder.fn(log))

    // trigger corresponding callbacks
    Object.values(this.callbacks)
      .filter((cb: Map) => cb.txHash === txHash)
      .forEach((cb: Map) => {
        cb.fn(log)
        delete this.callbacks[cb.id]
      })
  }

  async subscribe(dispatch: Function, getState: Function) {
    await this.cacheContracts(dispatch, getState)
    this.registerContractEvents()

    this.registerResponder(
      ContractEvents.APPLICATION_EVENT,
      applicationEventResponder(dispatch, getState),
    )

    this.registerResponder(
      ContractEvents.APPLICATION_WHITELISTED_EVENT,
      applicationWhitelistedEventResponder(dispatch, getState),
    )

    this.registerResponder(
      ContractEvents.CHALLENGE_EVENT,
      challengeEventResponder(dispatch, getState),
    )

    this.registerResponder(
      ContractEvents.APPLICATION_REMOVED_EVENT,
      listingRemovedEventResponder(dispatch, getState),
    )

    this.registerResponder(
      ContractEvents.LISTING_REMOVED_EVENT,
      listingRemovedEventResponder(dispatch, getState),
    )

    this.registerResponder(
      ContractEvents.CHALLENGE_SUCCEEDED_EVENT,
      challengeSucceededEventResponder(dispatch, getState),
    )

    this.registerResponder(
      ContractEvents.CHALLENGE_FAILED_EVENT,
      challengeFailedEventResponder(dispatch, getState),
    )

    this.registerResponder(
      ContractEvents.APPROVAL_EVENT,
      approvalEventResponder(dispatch, getState),
    )

    this.registerResponder(
      ContractEvents.TRANSFER_EVENT,
      transferEventResponder(dispatch, getState),
    )

    this.registerResponder(
      ContractEvents.VOTING_RIGHTS_GRANTED_EVENT,
      votingRightsGrantedEventResponder(dispatch, getState),
    )

    this.registerResponder(
      ContractEvents.VOTE_COMMITTED_EVENT,
      voteCommittedEventResponder(dispatch, getState),
    )
  }

  unsubscribe() {
    // unsubscribe from contract events
    const keys = Object.keys(this.emitters)
    keys.forEach((key) => {
      this.emitters[key].unsubscribe()
    })

    // reset local data
    this.contracts  = {}
    this.emitters   = {}
    this.requests   = {}
    this.responders = {}
    this.callbacks  = {}
  }

  registerResponder(eventName: string, fn: Function): string {
    const id = UUID()
    const responder = {
      id,
      eventName,
      fn,
    }

    this.responders[responder.id] = responder

    return responder.id
  }

  unregisterResponder(id: string): void {
    delete this.responders[id]
  }

  registerCallback(eventName: string, txHash: string, fn: Function): string {
    const id = UUID()
    const callback = {
      id,
      eventName,
      txHash,
      fn,
    }

    // Has the request already completed?
    // If so, go ahead and trigger the callbqck
    // Otherwise, queue it up
    if (this.requests[txHash]) {
      fn(this.requests[txHash])
    } else {
      this.callbacks[callback.id] = callback
    }

    return callback.id
  }

  unregisterCallback(id: string): void {
    delete this.callbacks[id]
  }
}

export default new ContractObserver()

