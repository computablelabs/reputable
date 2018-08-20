export const GET_APPLICATIONS = 'get-applications'
export const GET_APPLICATIONS_ERROR = 'get-applications-error'

export const CHALLENGE = 'challenge'
export const CHALLENGE_ERROR = 'challenge-error'
export const GET_CHALLENGES = 'get-challenges'
export const GET_CHALLENGES_ERROR = 'get-challenges-error'

export const LIST = 'list'
export const LIST_ERROR = 'list-error'
export const GET_LISTINGS = 'get-listings'

export const DEPLOY_TOKEN = 'deploy-token'
export const DEPLOY_TOKEN_ERROR = 'deploy-token-error'
export const DEPLOYED_TOKEN = 'deployed-token'
export const RESET_TOKEN = 'reset-token'

export const TRANSFER = 'transfer'
export const TRANSFER_ERROR = 'transfer-error'
export const TRANSFERRED = 'transferred'

export const DEPLOY_PARAMETERIZER = 'deploy-parameterizer'
export const DEPLOY_PARAMETERIZER_ERROR = 'deploy-parameterizer-error'
export const DEPLOYED_PARAMETERIZER = 'deployed-parameterizer'
export const RESET_PARAMETERIZER = 'reset-parameterizer'

export const DEPLOY_VOTING = 'deploy-voting'
export const DEPLOY_VOTING_ERROR = 'deploy-voting-error'
export const DEPLOYED_VOTING = 'deployed-voting'
export const RESET_VOTING = 'reset-voting'

export const DEPLOY_REGISTRY= 'deploy-registry'
export const DEPLOY_REGISTRY_ERROR = 'deploy-registry-error'
export const DEPLOYED_REGISTRY = 'deployed-registry'
export const RESET_REGISTRY= 'reset-registry'

export enum Contracts {
  TOKEN = 'token',
  PARAMETERIZER = 'parameterizer',
  VOTING = 'voting',
  REGISTRY = 'registry',
}

export enum TokenDefaults {
  SUPPLY = 1000000,
}

const THREE_MINUTES = 180
const HALF = 50

export enum ParameterizerDefaults {
  MIN_DEPOSIT = 1, // the minimum deposit, in whatever funds, required to participate
  P_MIN_DEPOSIT = 10, // min dep required to propose a parameterization change
  APPLY_STAGE_LEN = THREE_MINUTES, // time, in seconds, applicants must wait to be whitelisted. using 3 mins to allow time to challenge but not too long for a demo
  P_APPLY_STAGE_LEN = THREE_MINUTES, // the period over which reparameterization proposals are processed.
  COMMIT_STAGE_LEN = THREE_MINUTES, // length of the commit period for voting
  P_COMMIT_STAGE_LEN = THREE_MINUTES, // the same, but for reparameterization
  REVEAL_STAGE_LEN = THREE_MINUTES, // length of reveal period for voting
  P_REVEAL_STAGE_LEN = THREE_MINUTES, // same for the Parameterizer
  DISPENSATION_PCT = HALF, // percentage of a losing party's percentage distributed to a winning party
  P_DISPENSATION_PCT = HALF,
  VOTE_QUORUM = HALF, // type of majority out of 100 required for a vote success
  P_VOTE_QUORUM = HALF,
}

export enum Errors {
  NO_ADMIN_FOUND = 'No admin participant can be located. Be sure to register at least one participant',
  NO_WEBSOCKETADDRESS_FOUND = 'No Websocket address can be found. Make sure to set your ws address as it is needed for a web3 provider',
  NO_TOKEN_FOUND = 'No instantiated token contract is in the state tree. Be sure to deploy your token first',
  NO_DLL_FOUND = 'No address for a deployed DLL contract can be found. Make sure to deploy the DLL contract',
  NO_ATTRIBUTESTORE_FOUND = 'No address for a deployed AttributeStore contract can be found. Be sure to deploy the AttributeStore contract',
  NO_VOTING_FOUND = 'No address for a deployed PLCRVoting contract can be found. Be sure to deploy the Voting contract',
  NO_PARAMETERIZER_FOUND = 'No address for a deployed Parameterizer contract can be found. Be sure to deploy the Parameterizer contract',
}
