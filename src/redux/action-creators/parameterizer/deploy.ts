import Web3 from 'web3'
import { Nos } from 'computable/dist/types'
import { ParameterizerDeployParams } from 'computable/dist/interfaces'
import Parameterizer from 'computable/dist/contracts/parameterizer'
import { address as getTokenAddress } from '../../selectors/token'
import { address as getVotingAddress } from '../../selectors/voting'
import {
  Void,
  Action,
  FSA,
  State,
  Deployed,
  Participant,
} from '../../../interfaces'
import {
  DEPLOY_PARAMETERIZER,
  DEPLOY_PARAMETERIZER_ERROR,
  DEPLOYED_PARAMETERIZER,
  TokenDefaults,
  Errors,
} from '../../../constants'

/**
 * support actions for the thunk deployToken action itself
 */
const deployTokenAction = (tokenAddress:string, votingAddress:string, opts?:any): FSA => {
  const payload:ParameterizerDeployParams = {
    tokenAddress,
    votingAddress,
    ...opts,
  }

  return { type: DEPLOY_PARAMETERIZER, payload }
}

/**
 * Note this action can be used if the application is using an already deployed token.
 * Simply dispatch this with the address of said token
 */
const deployedParameterizer = (address:string): FSA => {
  const payload:Deployed = { address }
  return { type: DEPLOYED_PARAMETERIZER, payload }
}

const deployParameterizerError = (err:Error): FSA => (
  { type: DEPLOY_PARAMETERIZER_ERROR, payload: err }
)

/**
 * For applications which have not yet deployed a parameterizer, you can do it from here.
 * Used in Specs and tutorial apps as well...
 *
 * Note that we use the object `opts` here to house any number of the possible arguments, any
 * not specified should fall back to a set of defaults defined here in the app. Also, the
 * computable.js lib itself declares a set of defaults for the parameterizer - so any not specified
 * as defaults in this app will fall-back to those...
 */
const deployToken = (opts:any): any => {
  return async (dispatch:any, getState:any): Promise<string> => {
    const state:State = getState(),
      admin:Participant|undefined = state.participants && state.participants[0],
      websocketAddress = state.websocketAddress,
      tokenAddress = getTokenAddress(state),
      votingAddress = getVotingAddress(state)

    let parameterizerAddress = ''

    if (!websocketAddress) dispatch(deployParameterizerError(new Error(Errors.NO_WEBSOCKETADDRESS_FOUND)))
    else if (!admin) dispatch(deployParameterizerError(new Error(Errors.NO_ADMIN_FOUND)))
    else if (!tokenAddress) dispatch(deployParameterizerError(new Error(Errors.NO_TOKEN_FOUND)))
    else if (!dllAddress) dispatch(deployVotingError(new Error(Errors.NO_VOTING_FOUND)))
    else {
      // create web3 on demand with our provider
      const web3 = new Web3(new Web3.providers.WebsocketProvider(websocketAddress)),
        // we can dispatch deploy early here, as deploy is not to be confused with deployed
        action = deployTokenAction(address || admin.address)

      dispatch(action)
      // now that the deploy action is in flight, do the actual evm deploy and wait for the address
      const contract = new Erc20(address || admin.address)

      try {
        // we can just re-use our deploy action payload from above
        tokenAddress = await contract.deploy(web3, action.payload)
        dispatch(deployedToken(tokenAddress))
      } catch(err) {
        dispatch(deployTokenError(err))
      }
    }

    return tokenAddress
  }
}

// including with deployment actions as it fits best here
const resetToken = (): Action => ({ type: RESET_TOKEN })

export {
  deployToken,
  resetToken,
}
