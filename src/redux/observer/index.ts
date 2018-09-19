// Local Dependencies
import { EventEmitter, Map } from '../../interfaces'
import { getRegistryContract } from '../contracts'
import { observerError } from '../action-creators/observer'
import {
  applicationEventResponder,
  applicationWhitelistedEventResponder,
  challengeEventResponder,
  challengeSucceededEventResponder,
  challengeFailedEventResponder,
} from './responders'

const APPLICATION_EVENT             = '_Application'
const CHALLENGE_EVENT               = '_Challenge'
const APPLICATION_WHITELISTED_EVENT = '_ApplicationWhitelisted'
const CHALLENGE_SUCCEEDED_EVENT     = '_ChallengeSucceeded'
const CHALLENGE_FAILED_EVENT        = '_ChallengeFailed'

let contracts: Map = {}
let emitters: Map = {}

interface ContractObserverParams {
  dispatch: Function
  getState: Function
}
const subscribe = async ({ dispatch, getState }: ContractObserverParams) => {
  let emitter: EventEmitter
  const state = getState()

  try {
    contracts.registry = await getRegistryContract(state)
  } catch (err) {
    dispatch(observerError(err))
    return
  }

  emitter = contracts.registry.getEventEmitter(APPLICATION_EVENT) as EventEmitter
  emitters[APPLICATION_EVENT] = emitter
  emitter.on('data', applicationEventResponder(dispatch, getState))

  emitter = contracts.registry.getEventEmitter(APPLICATION_WHITELISTED_EVENT) as EventEmitter
  emitters[APPLICATION_WHITELISTED_EVENT] = emitter
  emitter.on('data', applicationWhitelistedEventResponder(dispatch, getState))

  emitter = contracts.registry.getEventEmitter(CHALLENGE_EVENT) as EventEmitter
  emitters[CHALLENGE_EVENT] = emitter
  emitter.on('data', challengeEventResponder(dispatch, getState))

  emitter = contracts.registry.getEventEmitter(CHALLENGE_SUCCEEDED_EVENT) as EventEmitter
  emitters[CHALLENGE_SUCCEEDED_EVENT] = emitter
  emitter.on('data', challengeSucceededEventResponder(dispatch, getState))

  emitter = contracts.registry.getEventEmitter(CHALLENGE_FAILED_EVENT) as EventEmitter
  emitters[CHALLENGE_FAILED_EVENT] = emitter
  emitter.on('data', challengeFailedEventResponder(dispatch, getState))
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

