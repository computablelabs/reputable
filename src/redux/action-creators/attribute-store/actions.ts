// Local Dependencies
import {
  FSA,
  Map,
  Deployed,
} from '../../../interfaces'

/* Action Types */
export const ATTRIBUTE_STORE_RESET = 'ATTRIBUTE_STORE_RESET'

export const ATTRIBUTE_STORE_DEPLOY_REQUEST = 'ATTRIBUTE_STORE_DEPLOY_REQUEST'
export const ATTRIBUTE_STORE_DEPLOY_OK = 'ATTRIBUTE_STORE_DEPLOY_OK'
export const ATTRIBUTE_STORE_DEPLOY_ERROR = 'ATTRIBUTE_STORE_DEPLOY_ERROR'

export const ATTRIBUTE_STORE_ADDRESS_OK = 'ATTRIBUTE_STORE_ADDRESS_OK'
export const ATTRIBUTE_STORE_ADDRESS_RESET = 'ATTRIBUTE_STORE_ADDRESS_RESET'

/* Actions */
// General
export const attributeStoreReset = (): FSA => ({
  type: ATTRIBUTE_STORE_RESET,
  payload: {},
})

// Deploy
export const attributeStoreDeployRequest = (value: Map): FSA => ({
  type: ATTRIBUTE_STORE_DEPLOY_REQUEST,
  payload: value,
})

export const attributeStoreDeployOk = (value: Deployed): FSA => ({
  type: ATTRIBUTE_STORE_DEPLOY_OK,
  payload: value,
})

export const attributeStoreDeployError = (value: Error): FSA => ({
  type: ATTRIBUTE_STORE_DEPLOY_ERROR,
  payload: value,
})

// Address
export const attributeStoreAddressOk = (value: Deployed): FSA => ({
  type: ATTRIBUTE_STORE_ADDRESS_OK,
  payload: value,
})

export const attributeStoreAddressReset = (): FSA => ({
  type: ATTRIBUTE_STORE_ADDRESS_RESET,
  payload: {},
})

