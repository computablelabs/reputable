import Web3 from 'web3'
import { State } from '../interfaces'
import { Errors } from '../constants'
import store from '../redux/store'
import { setWebsocketAddress } from '../redux/action-creators/web3'
import { getWebsocketAddress } from '../redux/selectors'

let provider: any
let web3: Web3

const initProvider = () => {
  const state: State = store.getState()
  const websocketAddress: string = getWebsocketAddress(state)

  if (!websocketAddress) {
    throw new Error(Errors.NO_WEBSOCKETADDRESS_FOUND)
  }

  provider = new Web3.providers.WebsocketProvider(websocketAddress)
}

const initWeb3 = () => {
  web3 = new Web3(provider)
}

interface web3Params { address?: string, force?: boolean }
const getWeb3 = async ({ address, force = false }: web3Params = {}) => {
  if (address) {
    await store.dispatch(setWebsocketAddress(address))
  }

  if (!provider || force) {
    initProvider()
  }

  if (!web3 || force) {
    initWeb3()
  }

  return web3
}

export { getWeb3 }

