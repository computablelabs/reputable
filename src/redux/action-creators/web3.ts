import { Action, FSA } from '../../interfaces'
import { WEBSOCKET_ADDRESS_SET, RESET_WEBSOCKET_ADDRESS } from '../../constants'

const setWebsocketAddress = (address:string): FSA => (
  {
    type: WEBSOCKET_ADDRESS_SET,
    payload: {
      // user can then instantiate web3 on demand via:
      // new Web3(new Web3.providers.WebsocketProvider(address))
      websocketAddress: address,
    },
  }
)

const resetWebsocketAddress = (): Action => ({ type: RESET_WEBSOCKET_ADDRESS })

export { setWebsocketAddress, resetWebsocketAddress }
