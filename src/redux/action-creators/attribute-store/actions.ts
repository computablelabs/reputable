import {
  FSA,
  Map,
  Deployed,
} from '../../../interfaces'

/* Action Types */
export const ATTRIBUTE_STORE_REQUEST = 'ATTRIBUTE_STORE_REQUEST'
export const ATTRIBUTE_STORE_OK = 'ATTRIBUTE_STORE_OK'
export const ATTRIBUTE_STORE_ERROR = 'ATTRIBUTE_STORE_ERROR'
export const ATTRIBUTE_STORE_RESET = 'ATTRIBUTE_STORE_RESET'

/* Actions */
export const attributeStoreRequest = (value: Map): FSA => ({
  type: ATTRIBUTE_STORE_REQUEST,
  payload: value,
})

export const attributeStoreOk = (value: Deployed): FSA => ({
  type: ATTRIBUTE_STORE_OK,
  payload: value,
})

export const attributeStoreError = (value: Error): FSA => ({
  type: ATTRIBUTE_STORE_ERROR,
  payload: value,
})

export const attributeStoreReset = (): FSA => ({
  type: ATTRIBUTE_STORE_RESET,
  payload: {},
})

