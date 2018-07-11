import { WEBSOCKET_ADDRESS_SET, RESET_WEBSOCKET_ADDRESS } from '../../constants'
import { FSA, Reducer } from '../../interfaces'

const websocketAddress:Reducer<string|undefined, FSA> = (state = '', action) => {
  const map = {
    [WEBSOCKET_ADDRESS_SET]: () => action.payload.websocketAddress,

    [RESET_WEBSOCKET_ADDRESS]: () => '',
  }

  // @ts-ignore:7017
  return map[action.type] ? map[action.type]() : state
}

export default websocketAddress
