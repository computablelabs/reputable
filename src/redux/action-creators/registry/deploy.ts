import { RegistryDeployParams } from 'computable/dist/interfaces'
import Registry from 'computable/dist/contracts/registry'
import {
  Action,
  FSA,
  State,
  Deployed,
  Participant,
} from '../../../interfaces'
import {
  DEPLOY_REGISTRY,
  DEPLOY_REGISTRY_ERROR,
  DEPLOYED_REGISTRY,
  RESET_REGISTRY,
  Errors,
} from '../../../constants'
import { address as getTokenAddress } from '../../selectors/token'
import { address as getVotingAddress } from '../../selectors/voting'
import { address as getParameterizerAddress } from '../../selectors/parameterizer'
import { getOwner } from '../../selectors'
import { getWeb3 } from '../../../helpers'

/**
 * support actions for the thunk deployToken action itself
 */
const deployRegistryAction = (
  tokenAddress:string,
  votingAddress:string,
  parameterizerAddress:string,
  name:string
): FSA => {
  const payload:RegistryDeployParams = {
    tokenAddress,
    votingAddress,
    parameterizerAddress,
    name,
  }

  return { type: DEPLOY_REGISTRY, payload }
}

/**
 * Note this action can be used if the application is using an already deployed token.
 * Simply dispatch this with the address of said token
 */
const deployedRegistry = (address:string): FSA => {
  const payload:Deployed = { address }
  return { type: DEPLOYED_REGISTRY, payload }
}

const deployRegistryError = (err:Error): FSA => (
  { type: DEPLOY_REGISTRY_ERROR, payload: err }
)

/**
 * Pass in a name for the registry and optionally a deploy-from address (will default to admin if falsy)
 */
const deployRegistry = (name:string, address?:string): any => {
  return async (dispatch:any, getState:any): Promise<string> => {
    const state:State = getState()
    const owner: Participant | undefined = getOwner(state)
    const tokenAddress = getTokenAddress(state)
    const votingAddress = getVotingAddress(state)
    const parameterizerAddress = getParameterizerAddress(state)

    let web3

    try {
      web3 = await getWeb3()
    } catch (err) {
      dispatch(deployRegistryError(err))
      return ''
    }

    if (!owner) {
      dispatch(deployRegistryError(new Error(Errors.NO_ADMIN_FOUND)))
      return ''
    }

    if (!tokenAddress) {
      dispatch(deployRegistryError(new Error(Errors.NO_TOKEN_FOUND)))
      return ''
    }

    if (!votingAddress) {
      dispatch(deployRegistryError(new Error(Errors.NO_VOTING_FOUND)))
      return ''
    }

    if (!parameterizerAddress) {
      dispatch(deployRegistryError(new Error(Errors.NO_PARAMETERIZER_FOUND)))
      return ''
    }

    // we can dispatch deploy early here, as deploy is not to be confused with deployed
    const action = deployRegistryAction(tokenAddress, votingAddress, parameterizerAddress, name)
    dispatch(action)
    // now that the deploy action is in flight, do the actual evm deploy and wait for the address
    const contract = new Registry(address || owner.address)

    try {
      // @ts-ignore:2345
      const registryAddress = await contract.deploy(web3, action.payload)
      dispatch(deployedRegistry(registryAddress))

      return registryAddress
    } catch(err) {
      dispatch(deployRegistryError(err))

      return ''
    }
  }
}

// including with deployment actions as it fits best here
const resetRegistry = (): Action => ({ type: RESET_REGISTRY })

export { deployRegistry, resetRegistry }

