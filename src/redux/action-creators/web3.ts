import Web3 from 'web3'
import { Action, FSA } from '../../interfaces'
import { WEBSOCKET_ADDRESS_SET, RESET_WEB3 } from '../../constants'

const setWebsocketAddress = (address:string): FSA => (
  {
    type: WEBSOCKET_ADDRESS_SET,
    payload: {
      web3: new Web3(new Web3.providers.WebsocketProvider(address)),
    },
  }
)

const resetWeb3 = (): Action => ({ type: RESET_WEB3 })

export { setWebsocketAddress, resetWeb3 }
