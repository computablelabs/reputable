import Web3 from 'web3'
import { Errors } from '../constants'

let provider: any
let web3: Web3

interface Web3Options {
  force?: boolean
}
const getWeb3 = async (address: string, { force = false }: Web3Options = {}) => {
  if (!address) {
    throw new Error(Errors.NO_WEBSOCKETADDRESS_FOUND)
  }

  if (!provider || force) {
    provider = new Web3.providers.WebsocketProvider(address)
  }

  if (!web3 || force) {
    web3 = new Web3(provider)
  }

  return web3
}

export { getWeb3 }

