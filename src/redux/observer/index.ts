// Local Dependencies
import { EventEmitter, Map } from '../../interfaces'
import {
  getRegistryContract,
  getTokenContract,
  getVotingContract,
} from '../contracts'
import { observerError } from '../action-creators/observer'
import {
  applicationEventResponder,
  applicationWhitelistedEventResponder,
  challengeEventResponder,
  challengeSucceededEventResponder,
  challengeFailedEventResponder,
  approvalEventResponder,
  transferEventResponder,
  votingRightsGrantedEventResponder,
  voteCommittedEventResponder,
} from './responders'

const APPLICATION_EVENT             = '_Application'
const CHALLENGE_EVENT               = '_Challenge'
const APPLICATION_WHITELISTED_EVENT = '_ApplicationWhitelisted'
const CHALLENGE_SUCCEEDED_EVENT     = '_ChallengeSucceeded'
const CHALLENGE_FAILED_EVENT        = '_ChallengeFailed'
const APPROVAL_EVENT                = 'Approval'
const TRANSFER_EVENT                = 'Transfer'
const VOTING_RIGHTS_GRANTED_EVENT   = '_VotingRightsGranted'
const VOTE_COMMITTED_EVENT          = '_VoteCommitted'

let contracts: Map = {}
let emitters: Map = {}

interface ContractObserverParams {
  dispatch: Function
  getState: Function
}
const subscribe = async ({ dispatch, getState }: ContractObserverParams) => {
  const state = getState()

  try {
    contracts.registry = await getRegistryContract(state)
    contracts.token    = await getTokenContract(state)
    contracts.voting   = await getVotingContract(state)
  } catch (err) {
    dispatch(observerError(err))
    return
  }

  subscribeToContractEvent({
    contract: contracts.registry,
    eventName: APPLICATION_EVENT,
    responder: applicationEventResponder(dispatch, getState),
  })

  subscribeToContractEvent({
    contract: contracts.registry,
    eventName: APPLICATION_WHITELISTED_EVENT,
    responder: applicationWhitelistedEventResponder(dispatch, getState),
  })

  subscribeToContractEvent({
    contract:  contracts.registry,
    eventName: CHALLENGE_EVENT,
    responder: challengeEventResponder(dispatch, getState),
  })

  subscribeToContractEvent({
    contract:  contracts.registry,
    eventName: CHALLENGE_SUCCEEDED_EVENT,
    responder: challengeSucceededEventResponder(dispatch, getState),
  })

  subscribeToContractEvent({
    contract:  contracts.registry,
    eventName: CHALLENGE_FAILED_EVENT,
    responder: challengeFailedEventResponder(dispatch, getState),
  })

  subscribeToContractEvent({
    contract:  contracts.token,
    eventName: APPROVAL_EVENT,
    responder: approvalEventResponder(dispatch, getState),
  })

  subscribeToContractEvent({
    contract:  contracts.token,
    eventName: TRANSFER_EVENT,
    responder: transferEventResponder(dispatch, getState),
  })

  subscribeToContractEvent({
    contract:  contracts.voting,
    eventName: VOTING_RIGHTS_GRANTED_EVENT,
    responder: votingRightsGrantedEventResponder(dispatch, getState),
  })

  subscribeToContractEvent({
    contract:  contracts.voting,
    eventName: VOTE_COMMITTED_EVENT,
    responder: voteCommittedEventResponder(dispatch, getState),
  })
}

const subscribeToContractEvent = ({ contract, eventName, responder }: Map): void => {
  const emitter = contract.getEventEmitter(eventName) as EventEmitter
  emitters[eventName] = emitter
  emitter.on('data', responder)
}

const unsubscribe = () => {
  const keys = Object.keys(emitters)
  keys.forEach((key) => {
    emitters[key].unsubscribe()
  })

  contracts = {}
  emitters = {}
}

export default { subscribe, unsubscribe }

