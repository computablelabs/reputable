// Dependencies
import Registry from 'computable/dist/contracts/registry'

// Local Dependencies
import { Map, Participant } from '../../interfaces'
import { Errors } from '../../constants'
import { getWeb3 } from '../contracts'
import { getOwner, getRegistryAddress } from '../selectors'

const getRegistryContract = async (state: Map): Promise<Registry> => {
  const owner: Participant|undefined = getOwner(state)
  if (!owner) {
    throw new Error(Errors.NO_ADMIN_FOUND)
  }

  const web3 = await getWeb3(state)

  const contractAddress: string = getRegistryAddress(state)
  if (!contractAddress) {
    throw new Error(Errors.NO_REGISTRY_FOUND)
  }

  const contract: Registry = new Registry(owner.address)
  await contract.at(web3, { address: contractAddress })

  return contract
}

export { getRegistryContract }

