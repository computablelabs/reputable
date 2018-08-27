/**
 * We have to setup a Web3 instance for our state tree. The user need not
 * enter any more information than websocket address, we'll then make a web3
 * instance from that, with a WebSocketProvider set.
 */

import store from '../store'
import { resetWebsocketAddress as resetAddress } from '../action-creators/web3'

const resetWebsocketAddress = (): void => {
  store.dispatch(resetAddress())
}

export { resetWebsocketAddress }

