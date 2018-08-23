import Web3 from 'web3'
import Erc20 from 'computable/dist/contracts/erc-20'
import { Participant } from '../../interfaces'
import { Errors } from '../../constants'

interface TokenContractParams {
  web3: Web3
  address?: string
  owner: Participant
}
const getTokenContract = async ({ web3, address, owner }: TokenContractParams) => {
  if (!owner) {
    throw new Error(Errors.NO_ADMIN_FOUND)
  }

  const contract = new Erc20(owner.address)

  if (address) {
    await contract.at(web3, { address })
  }

  if (!contract) {
    throw new Error(Errors.NO_TOKEN_FOUND)
  }

  return contract
}

export { getTokenContract }

