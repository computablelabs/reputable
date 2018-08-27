import { FSA, Action, Deployed } from '../../../interfaces'

// Action Types
export const WEBSOCKET_ADDRESS_SET = 'WEBSOCKET_ADDRESS_SET'
export const RESET_WEBSOCKET_ADDRESS = 'RESET_WEBSOCKET_ADDRESS'

// Actions
const websocketAddressOk = (value: Deployed): FSA => ({
  type: WEBSOCKET_ADDRESS_SET,
  payload: value,
})

const websocketAddressReset = (): FSA => ({
  type: RESET_WEBSOCKET_ADDRESS,
  payload: {},
})

// Action Creators
const setWebsocketAddress = (address: string): any => (
  async (dispatch: Function): Promise<Action> => (
    dispatch(websocketAddressOk({ address }))
  )
)

const resetWebsocketAddress = (): any => (
  async (dispatch: Function): Promise<Action> => (
    dispatch(websocketAddressReset())
  )
)

export { setWebsocketAddress, resetWebsocketAddress }

