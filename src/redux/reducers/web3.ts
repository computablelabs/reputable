import { WEBSOCKET_ADDRESS_SET, RESET_WEBSOCKET_ADDRESS } from '../../constants'
import { FSA, Reducer, ReductionMap } from '../../interfaces'

const websocketAddress:Reducer<string|undefined, FSA> = (state = '', action) => {
  const map:ReductionMap = {
    [WEBSOCKET_ADDRESS_SET]: () => action.payload.websocketAddress,

    [RESET_WEBSOCKET_ADDRESS]: () => '',
  }

  return map[action.type] ? map[action.type]() : state
}

export default websocketAddress
