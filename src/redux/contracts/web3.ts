// Dependencies
import Web3 from 'web3'

// Local Dependencies
import { Map } from '../../interfaces'
import { Errors } from '../../constants'
import { getWeb3 as initWeb3 } from '../../initializers'
import { getWebsocketAddress } from '../selectors'

const getWeb3 = async (state: Map): Promise<Web3> => {
  const websocketAddress: string = getWebsocketAddress(state)
  if (!websocketAddress) {
    throw new Error(Errors.NO_WEBSOCKETADDRESS_FOUND)
  }

  const web3 = await initWeb3(websocketAddress)

  return web3
}

export { getWeb3 }

