// Dependencies
import { ParameterizerDeployParams } from 'computable/dist/interfaces'
import Parameterizer from 'computable/dist/contracts/parameterizer'

// Local Dependencies
import { State, Participant } from '../../../interfaces'
import { Errors } from '../../../constants'
import { getWeb3 } from '../../../initializers'
import {
  getWebsocketAddress,
  getOwner,
  getTokenAddress,
  getVotingAddress,
} from '../../selectors'
import {
  parameterizerDeployRequest,
  parameterizerDeployOk,
  parameterizerDeployError,
} from './actions'

/* Action Creators */
/**
 * Note that `options` are a partial since a complete set of values is
 * not expected. Anything not set here will be assigned default values
 * in Computable.js.
 */
const deployParameterizer = (options?: Partial<ParameterizerDeployParams>): any => (
  async (dispatch: Function, getState: Function): Promise<string> => {
    const state:State = getState()

    const args = { options }
    dispatch(parameterizerDeployRequest(args))

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

      const contract = new Parameterizer(owner.address)
      const parameterizerAddress: string = await contract.deploy(web3, {
        tokenAddress,
        votingAddress,
        ...options,
      })

      dispatch(parameterizerDeployOk({ address: parameterizerAddress }))

      return parameterizerAddress
    } catch (err) {
      dispatch(parameterizerDeployError(err))

      return ''
    }
  }
)

export { deployParameterizer }

