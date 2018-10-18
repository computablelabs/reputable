// Dependencies
import Registry from '@computable/computablejs/dist/contracts/registry'

// Local Dependencies
import { State, Participant } from '../../../interfaces'
import { Errors } from '../../../constants'
import { getWeb3 } from '../../../initializers'
import {
  getWebsocketAddress,
  getOwner,
  getTokenAddress,
  getParameterizerAddress,
  getVotingAddress,
} from '../../selectors'
import {
  registryDeployRequest,
  registryDeployOk,
  registryDeployError,
} from './actions'

/* Action Creators */
const deployRegistry = (name:string): any => (
  async (dispatch:any, getState:any): Promise<void> => {
    const state:State = getState()

    const args = { name }
    dispatch(registryDeployRequest(args))

    try {
      const owner: Participant|undefined = getOwner(state)
      if (!owner) {
        throw new Error(Errors.NO_ADMIN_FOUND)
      }

      const websocketAddress: string = getWebsocketAddress(state)
      if (!websocketAddress) {
        throw new Error(Errors.NO_WEBSOCKETADDRESS_FOUND)
      }

      const web3 = await getWeb3(websocketAddress)

      const tokenAddress: string = getTokenAddress(state)
      if (!tokenAddress) {
        throw new Error(Errors.NO_TOKEN_FOUND)
      }

      const votingAddress: string = getVotingAddress(state)
      if (!votingAddress) {
        throw new Error(Errors.NO_VOTING_FOUND)
      }

      const parameterizerAddress: string = getParameterizerAddress(state)
      if (!parameterizerAddress) {
        throw new Error(Errors.NO_PARAMETERIZER_FOUND)
      }

      const contract = new Registry(owner.address)

      const registryAddress: string = await contract.deploy(web3, {
        name,
        tokenAddress,
        votingAddress,
        parameterizerAddress,
      })

      dispatch(registryDeployOk({ address: registryAddress }))
    } catch(err) {
      dispatch(registryDeployError(err))
    }
  }
)

export { deployRegistry }

