export const PARTICIPATE = 'participate'
export const PARTICIPATE_ERROR = 'participate-error'
export const RESET_PARTICIPANTS = 'reset-participants'

export const APPLY = 'apply'
export const APPLY_ERROR = 'apply-error'

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

export const APPROVE = 'approve'
export const APPROVE_ERROR = 'approve-error'

export const WEBSOCKET_ADDRESS_SET = 'websocket-address-set'

export const RESET_WEB3 = 'reset-web3'

export enum Contracts {
  TOKEN = 'token',
  PARAMETERIZER = 'parameterizer',
  VOTING = 'voting',
  REGISTRY = 'registry',
}

export enum TokenDefaults {
  SUPPLY = 1000000,
}

export enum Errors {
  NO_ADMIN_FOUND = 'No admin participant can be located. Be sure to register at least one participant',
  NO_WEB3_FOUND = 'No instantiated Web3 object can be found. Make sure to instantiate it with a provider',
}
