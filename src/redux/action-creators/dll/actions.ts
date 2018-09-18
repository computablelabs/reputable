// Local Dependencies
import {
  FSA,
  Map,
  Deployed,
} from '../../../interfaces'

/* Action Types */
export const DLL_RESET = 'DLL_RESET'

export const DLL_DEPLOY_REQUEST = 'DLL_DEPLOY_REQUEST'
export const DLL_DEPLOY_OK = 'DLL_DEPLOY_OK'
export const DLL_DEPLOY_ERROR = 'DLL_DEPLOY_ERROR'

export const DLL_ADDRESS_OK = 'DLL_ADDRESS_OK'
export const DLL_ADDRESS_RESET = 'DLL_ADDRESS_RESET'

/* Actions */
// General
export const dllReset = (): FSA => ({
  type: DLL_RESET,
  payload: {},
})

// Deploy
export const dllDeployRequest = (value: Map): FSA => ({
  type: DLL_DEPLOY_REQUEST,
  payload: value,
})

export const dllDeployOk = (value: Deployed): FSA => ({
  type: DLL_DEPLOY_OK,
  payload: value,
})

export const dllDeployError = (value: Error): FSA => ({
  type: DLL_DEPLOY_ERROR,
  payload: value,
})

// Address
export const dllAddressOk = (value: Deployed): FSA => ({
  type: DLL_ADDRESS_OK,
  payload: value,
})

export const dllAddressReset = (): FSA => ({
  type: DLL_ADDRESS_RESET,
  payload: {},
})

