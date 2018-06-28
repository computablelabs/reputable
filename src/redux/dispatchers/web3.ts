/**
 * We have to setup a Web3 instance for our state tree. The user need not
 * enter any more information than websocket address, we'll then make a web3
 * instance from that, with a WebSocketProvider set.
 */

import store from '../store'
import Web3 from 'web3'
import { WEBSOCKET_ADDRESS_SET, RESET_WEB3 } from '../../constants'
import { Action, WebsocketAddressSet } from '../../interfaces'

const setWebsocketAddress = (address:string): void => {
  // instantiate a web3 websocket provider, we don't need a 2 part dispatch here as it's all sync
  const provider = new Web3.providers.WebsocketProvider(address),
    o:WebsocketAddressSet = {
      type: WEBSOCKET_ADDRESS_SET,
      web3: new Web3(provider),
    }

  store.dispatch(o)
}

const resetWeb3 = (): void => {
  const o:Action = { type: RESET_WEB3 }
  store.dispatch(o)
}

export { setWebsocketAddress, resetWeb3 }
