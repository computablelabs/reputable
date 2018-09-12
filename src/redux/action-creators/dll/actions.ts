import {
  FSA,
  Map,
  Deployed,
} from '../../../interfaces'

/* Action Types */
export const DLL_REQUEST = 'DLL_REQUEST'
export const DLL_OK = 'DLL_OK'
export const DLL_ERROR = 'DLL_ERROR'
export const DLL_RESET = 'DLL_RESET'

/* Actions */
export const dllRequest = (value: Map): FSA => ({
  type: DLL_REQUEST,
  payload: value,
})

export const dllOk = (value: Deployed): FSA => ({
  type: DLL_OK,
  payload: value,
})

export const dllError = (value: Error): FSA => ({
  type: DLL_ERROR,
  payload: value,
})

export const dllReset = (): FSA => ({
  type: DLL_RESET,
  payload: {},
})

