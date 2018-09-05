import Web3 from 'web3'

let provider: any
let web3: Web3

interface Web3Options {
  force?: boolean
}
const getWeb3 = (address: string, { force = false }: Web3Options = {}) => {
  if (!provider || force) {
    provider = new Web3.providers.WebsocketProvider(address)
  }

  if (!web3 || force) {
    web3 = new Web3(provider)
  }

  return web3
}

const getProvider = () => {
  if (!provider) {
    return undefined
  }

  return provider
}

export { getWeb3, getProvider }

