import Web3 from 'web3'
import { RegistryDeployParams } from 'computable/dist/interfaces'
import Registry from 'computable/dist/contracts/registry'
import { address as getTokenAddress } from '../../selectors/token'
import { address as getVotingAddress } from '../../selectors/voting'
import { address as getParameterizerAddress } from '../../selectors/parameterizer'
import { getParticipants } from '../../selectors'
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
    const state:State = getState(),
      websocketAddress = state.websocketAddress,
      participants = getParticipants(state),
      admin:Participant|undefined = participants && participants[0],
      tokenAddress = getTokenAddress(state),
      votingAddress = getVotingAddress(state),
      parameterizerAddress = getParameterizerAddress(state)

    let registryAddress = ''

    if (!websocketAddress) dispatch(deployRegistryError(new Error(Errors.NO_WEBSOCKETADDRESS_FOUND)))
    else if (!admin) dispatch(deployRegistryError(new Error(Errors.NO_ADMIN_FOUND)))
    else if (!tokenAddress) dispatch(deployRegistryError(new Error(Errors.NO_TOKEN_FOUND)))
    else if (!votingAddress) dispatch(deployRegistryError(new Error(Errors.NO_VOTING_FOUND)))
    else if (!parameterizerAddress) dispatch(deployRegistryError(new Error(Errors.NO_PARAMETERIZER_FOUND)))
    else {
      // create web3 on demand with our provider
      const web3 = new Web3(new Web3.providers.WebsocketProvider(websocketAddress)),
        // we can dispatch deploy early here, as deploy is not to be confused with deployed
        action = deployRegistryAction(tokenAddress, votingAddress, parameterizerAddress, name)

      dispatch(action)
      // now that the deploy action is in flight, do the actual evm deploy and wait for the address
      const contract = new Registry(address || admin.address)

      try {
        // @ts-ignore:2345
        registryAddress = await contract.deploy(web3, action.payload)
        dispatch(deployedRegistry(registryAddress))
      } catch(err) {
        dispatch(deployRegistryError(err))
      }
    }

    return registryAddress
  }
}

// including with deployment actions as it fits best here
const resetRegistry = (): Action => ({ type: RESET_REGISTRY })

export {
  deployRegistry,
  resetRegistry,
}
