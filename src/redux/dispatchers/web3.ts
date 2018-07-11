/**
 * We have to setup a Web3 instance for our state tree. The user need not
 * enter any more information than websocket address, we'll then make a web3
 * instance from that, with a WebSocketProvider set.
 */

import store from '../store'
import { setWebsocketAddress as setAddress, resetWebsocketAddress as reset } from '../action-creators/web3'

const setWebsocketAddress = (address:string): void => {
  store.dispatch(setAddress(address))
}

const resetWebsocketAddress = (): void => {
  // const o:Action = { type: RESET_WEB3 }
  store.dispatch(reset())
}

export { setWebsocketAddress, resetWebsocketAddress }
