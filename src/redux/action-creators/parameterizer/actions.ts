// Local Dependencies
import {
  FSA,
  Map,
  Deployed,
} from '../../../interfaces'

/* Action Types */
export const PARAMETERIZER_RESET = 'PARAMETERIZER_RESET'

export const PARAMETERIZER_DEPLOY_REQUEST = 'PARAMETERIZER_DEPLOY_REQUEST'
export const PARAMETERIZER_DEPLOY_OK = 'PARAMETERIZER_DEPLOY_OK'
export const PARAMETERIZER_DEPLOY_ERROR = 'PARAMETERIZER_DEPLOY_ERROR'

export const PARAMETERIZER_ADDRESS_OK = 'PARAMETERIZER_ADDRESS_OK'
export const PARAMETERIZER_ADDRESS_RESET = 'PARAMETERIZER_ADDRESS_RESET'

/* Actions */
// General
export const parameterizerReset = (): FSA => ({
  type: PARAMETERIZER_RESET,
  payload: {},
})

// Deploy
export const parameterizerDeployRequest = (value: Map): FSA => ({
  type: PARAMETERIZER_DEPLOY_REQUEST,
  payload: value,
})

export const parameterizerDeployOk = (value: Deployed): FSA => ({
  type: PARAMETERIZER_DEPLOY_OK,
  payload: value,
})

export const parameterizerDeployError = (value: Error): FSA => ({
  type: PARAMETERIZER_DEPLOY_ERROR,
  payload: value,
})

// Address
export const parameterizerAddressOk = (value: Deployed): FSA => ({
  type: PARAMETERIZER_ADDRESS_OK,
  payload: value,
})

export const parameterizerAddressReset = (): FSA => ({
  type: PARAMETERIZER_ADDRESS_RESET,
  payload: {},
})

