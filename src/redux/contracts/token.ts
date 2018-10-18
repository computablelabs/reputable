// Dependencies
import Erc20 from '@computable/computablejs/dist/contracts/erc-20'

// Local Dependencies
import { Map, Participant } from '../../interfaces'
import { Errors } from '../../constants'
import { getWeb3 } from '../../initializers'
import { getOwner, getWebsocketAddress, getTokenAddress } from '../selectors'

const getTokenContract = async (state: Map): Promise<Erc20> => {
  const owner: Participant|undefined = getOwner(state)
  if (!owner) {
    throw new Error(Errors.NO_ADMIN_FOUND)
  }

  const websocketAddress: string = getWebsocketAddress(state)
  if (!websocketAddress) {
    throw new Error(Errors.NO_WEBSOCKETADDRESS_FOUND)
  }

  const web3 = await getWeb3(websocketAddress)

  const contractAddress = getTokenAddress(state)
  if (!contractAddress) {
    throw new Error(Errors.NO_TOKEN_FOUND)
  }

  const contract = new Erc20(owner.address)
  await contract.at(web3, { address: contractAddress })

  return contract
}

export { getTokenContract }

