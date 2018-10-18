// Dependencies
import Voting from '@computable/computablejs/dist/contracts/plcr-voting'

// Local Dependencies
import { Map, Participant } from '../../interfaces'
import { Errors } from '../../constants'
import { getWeb3 } from '../../initializers'
import { getOwner, getWebsocketAddress, getVotingAddress } from '../selectors'

const getVotingContract = async (state: Map): Promise<Voting> => {
  const owner: Participant|undefined = getOwner(state)
  if (!owner) {
    throw new Error(Errors.NO_ADMIN_FOUND)
  }

  const websocketAddress: string = getWebsocketAddress(state)
  if (!websocketAddress) {
    throw new Error(Errors.NO_WEBSOCKETADDRESS_FOUND)
  }

  const web3 = await getWeb3(websocketAddress)

  const contractAddress: string = getVotingAddress(state)
  if (!contractAddress) {
    throw new Error(Errors.NO_VOTING_FOUND)
  }

  const contract: Voting = new Voting(owner.address)
  await contract.at(web3, { address: contractAddress })

  return contract
}

export { getVotingContract }

