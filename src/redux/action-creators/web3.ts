import { FSA, Map } from '../../interfaces'

// Action Types
export const WEBSOCKET_ADDRESS_SET = 'WEBSOCKET_ADDRESS_SET'
export const RESET_WEBSOCKET_ADDRESS = 'RESET_WEBSOCKET_ADDRESS'

// Actions
const websocketAddressOk = (value: Map): FSA => ({
  type: WEBSOCKET_ADDRESS_SET,
  payload: value,
})

// user can then instantiate web3 on demand via:
// new Web3(new Web3.providers.WebsocketProvider(address))
const websocketAddressReset = (): FSA => ({
  type: RESET_WEBSOCKET_ADDRESS,
  payload: {},
})

const setWebsocketAddress = (address: string): any =>
  async (dispatch: Function, getState: Function): Promise<void> => {
    dispatch(websocketAddressOk({ address }))
    return Promise.resolve()
  }

const resetWebsocketAddress = (): any =>
  async (dispatch: Function, getState: Function): Promise<void> => {
    dispatch(websocketAddressReset())
    return Promise.resolve()
  }

export { setWebsocketAddress, resetWebsocketAddress }

