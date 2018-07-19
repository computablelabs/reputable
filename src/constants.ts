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
export const TRANSFERRED = 'transferred'

export const APPROVE = 'approve'
export const APPROVE_ERROR = 'approve-error'
export const APPROVED = 'approved'

export const DEPLOY_DLL = 'deploy-dll'
export const DEPLOY_DLL_ERROR = 'deploy-dll-error'
export const DEPLOYED_DLL = 'deployed-dll'

export const DEPLOY_ATTRIBUTE_STORE = 'deploy-attribute-store'
export const DEPLOY_ATTRIBUTE_STORE_ERROR = 'deploy-attribute-store-error'
export const DEPLOYED_ATTRIBUTE_STORE = 'deployed-attribute-store'

export const DEPLOY_VOTING = 'deploy-voting'
export const DEPLOY_VOTING_ERROR = 'deploy-voting-error'
export const DEPLOYED_VOTING = 'deployed-voting'


export const WEBSOCKET_ADDRESS_SET = 'websocket-address-set'
export const RESET_WEBSOCKET_ADDRESS = 'reset-websocket-address'

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
  NO_WEBSOCKETADDRESS_FOUND = 'No Websocket address can be found. Make sure to set your ws address as it is needed for a web3 provider',
  NO_TOKEN_FOUND = 'No instantiated token contract is in the state tree. Be sure to deploy your token first',
  NO_DLL_FOUND = 'No address for a deployed DLL contract can be found. Make sure to deploy the DLL contract first',
  NO_ATTRIBUTESTORE_FOUND = 'No address for a deployed AttributeStore contract can be found. Be sure to deploy the AttributeStore contract first',
}
