// Local Dependencies
import { FSA, Deployed } from '../../../interfaces'

/* Action Types */
export const WEBSOCKET_ADDRESS_SET = 'WEBSOCKET_ADDRESS_SET'
export const RESET_WEBSOCKET_ADDRESS = 'RESET_WEBSOCKET_ADDRESS'

/* Actions */
export const websocketAddressOk = (value: Deployed): FSA => ({
  type: WEBSOCKET_ADDRESS_SET,
  payload: value,
})

export const websocketAddressReset = (): FSA => ({
  type: RESET_WEBSOCKET_ADDRESS,
  payload: {},
})

