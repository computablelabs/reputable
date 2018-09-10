import { FSA, Map, Deployed } from '../../../interfaces'

// Action Types
export const VOTING_DEPLOY_REQUEST = 'VOTING_DEPLOY_REQUEST'
export const VOTING_DEPLOY_OK = 'VOTING_DEPLOY_OK'
export const VOTING_DEPLOY_ERROR = 'VOTING_DEPLOY_ERROR'

export const VOTING_ADDRESS_OK = 'VOTING_DEPLOY_ADDRESS_OK'
export const VOTING_ADDRESS_RESET = 'VOTING_DEPLOY_ADDRESS_RESET'

export const VOTING_VOTE_REQUEST = 'VOTING_VOTE_REQUEST'
export const VOTING_VOTE_OK = 'VOTING_VOTE_OK'
export const VOTING_VOTE_ERROR = 'VOTING_VOTE_ERROR'

/* Actions */
// Deployment
export const votingDeployRequest = (value: Map): FSA => ({
  type: VOTING_DEPLOY_REQUEST,
  payload: value,
})

export const votingDeployOk = (value: Deployed): FSA => ({
  type: VOTING_DEPLOY_OK,
  payload: value,
})

export const votingDeployError = (value: Error): FSA => ({
  type: VOTING_DEPLOY_ERROR,
  payload: value,
})

// Address
export const votingAddressOk = (value: Deployed): FSA => ({
  type: VOTING_ADDRESS_OK,
  payload: value,
})

export const votingAddressReset = (): FSA => ({
  type: VOTING_ADDRESS_RESET,
  payload: {},
})

// Vote
export const votingVoteRequest = (value: Map): FSA => ({
  type: VOTING_VOTE_REQUEST,
  payload: value,
})

export const votingVoteOk = (value: Map): FSA => ({
  type: VOTING_VOTE_OK,
  payload: value,
})

export const votingVoteError = (value: Error): FSA => ({
  type: VOTING_VOTE_ERROR,
  payload: value,
})

