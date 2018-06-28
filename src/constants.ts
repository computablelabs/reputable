export const PARSE_URL:string = 'parse-url'
export const PARTICIPATE = 'participate'
export const RESET_PARTICIPANTS = 'reset-participants'
export const APPLY:string = 'apply'
export const GET_APPLICATIONS:string = 'get-applications'
export const CHALLENGE:string = 'challenge'
export const GET_CHALLENGES:string = 'get-challenges'
export const LIST:string = 'list'
export const GET_LISTINGS:string = 'get-listings'
export const DEPLOY_TOKEN:string = 'deploy-token'
export const DEPLOYED_TOKEN:string = 'deployed-token'
export const RESET_TOKEN:string = 'reset-token'
export const TRANSFER:string = 'transfer'
export const APPROVE:string = 'approve'
export const WEBSOCKET_ADDRESS_SET:string = 'websocket-address-set'
export const RESET_WEB3:string = 'reset-web3'

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
