import Erc20 from 'computable/dist/contracts/erc-20'
import { State } from '../../interfaces'
import { Errors } from '../../constants'
import { getWeb3 } from '../web3'
import { getWebsocketAddress, getOwner } from '../../redux/selectors'
import { address as getTokenAddress } from '../../redux/selectors/token'

const getTokenContract = async (state: State) => {
  const websocketAddress: string = getWebsocketAddress(state)
  const web3 = await getWeb3(websocketAddress)

  const owner = getOwner(state)
  if (!owner) {
    throw new Error(Errors.NO_ADMIN_FOUND)
  }

  const contract = new Erc20(owner.address)

  const tokenAddress: string|undefined = getTokenAddress(state)
  if (tokenAddress) {
    await contract.at(web3, { address: tokenAddress })
  }

  if (!contract) {
    throw new Error(Errors.NO_TOKEN_FOUND)
  }

  return contract
}

export { getTokenContract }

