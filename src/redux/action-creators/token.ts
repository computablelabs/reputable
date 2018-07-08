import Web3 from 'web3'
import { Nos } from 'computable/dist/types'
import { Erc20DeployParams } from 'computable/dist/interfaces'
import Erc20 from 'computable/dist/contracts/erc-20'
import {
  Void,
  Action,
  FSA,
  State,
  DeployedToken,
  Participant
} from '../../interfaces'
import {
  DEPLOY_TOKEN,
  DEPLOY_TOKEN_ERROR,
  DEPLOYED_TOKEN,
  RESET_TOKEN,
  TokenDefaults,
  Errors,
} from '../../constants'

/**
 * support actions for the thunk deployToken action itself
 */
const deployTokenAction = (address:string, supply?:Nos): FSA => {
  const payload:Erc20DeployParams = {
    address,
    supply: supply || TokenDefaults.SUPPLY,
  }

  return { type: DEPLOY_TOKEN, payload }
}

const deployedToken = (address:string, contract:Erc20): FSA => {
  const payload:DeployedToken = {address, contract}
  return { type: DEPLOYED_TOKEN, payload }
}

const deployTokenError = (err:Error): FSA => (
  { type: DEPLOY_TOKEN_ERROR, payload: err }
)

const deployToken = (address?:string, supply?:Nos): any => {
  return async (dispatch:any, getState:any): Promise<string> => {
    const state:State = getState(),
      web3:Web3|undefined = state.web3,
      admin:Participant|undefined = state.participants && state.participants[0]

    let tokenAddress = ''

    if (!web3) dispatch(deployTokenError(new Error(Errors.NO_WEB3_FOUND)))
    else if (!admin) dispatch(deployTokenError(new Error(Errors.NO_ADMIN_FOUND)))
    else {
      // we can dispatch deploy early here, as deploy is not to be confused with deployed
      const action = deployTokenAction(address || admin.address)
      dispatch(action)
      // now that the deploy action is in flight, do the actual evm deploy and wait for the address
      const contract = new Erc20(address || admin.address)

      try {
        // we can just re-use our deploy action payload from above
        tokenAddress = await contract.deploy(web3, action.payload)
        dispatch(deployedToken(tokenAddress, contract))
      } catch(err) {
        dispatch(deployTokenError(err))
      }
    }

    return tokenAddress
  }
}

const resetToken = (): Action => ({ type: RESET_TOKEN })

export {
  deployToken,
  resetToken,
}
