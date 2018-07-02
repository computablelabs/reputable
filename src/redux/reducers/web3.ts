import Web3 from 'web3'
import { WEBSOCKET_ADDRESS_SET, RESET_WEB3 } from '../../constants'
import { FSA, Reducer } from '../../interfaces'

const web3:Reducer<Web3|null, FSA> = (state = null, action) => {
  const map = {
    [WEBSOCKET_ADDRESS_SET]: () => action.payload.web3,

    [RESET_WEB3]: () => null,
  }

  // @ts-ignore:7017
  return map[action.type] ? map[action.type]() : state
}

export default web3
