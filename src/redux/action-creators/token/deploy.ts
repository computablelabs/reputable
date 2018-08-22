import { Nos } from 'computable/dist/types'
import { Erc20DeployParams } from 'computable/dist/interfaces'
import Erc20 from 'computable/dist/contracts/erc-20'
import {
  Action,
  FSA,
  State,
  Deployed,
  Participant,
} from '../../../interfaces'
import {
  DEPLOY_TOKEN,
  DEPLOY_TOKEN_ERROR,
  DEPLOYED_TOKEN,
  RESET_TOKEN,
  TokenDefaults,
  Errors,
} from '../../../constants'
import { getWebsocketAddress, getOwner } from '../../selectors'
import { getWeb3 } from '../../../helpers'

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

/**
 * Note this action can be used if the application is using an already deployed token.
 * Simply dispatch this with the address of said token
 */
const deployedToken = (address:string): FSA => {
  const payload:Deployed = { address }
  return { type: DEPLOYED_TOKEN, payload }
}

const deployTokenError = (err:Error): FSA => (
  { type: DEPLOY_TOKEN_ERROR, payload: err }
)

/**
 * For applications which have not yet deployed a token, you can do it from here.
 * Used in Specs and tutorial apps as well...
 */
const deployToken = (address?:string, supply?:Nos): any => {
  return async (dispatch:any, getState:any): Promise<string> => {
    const state:State = getState()
    const websocketAddress: string = getWebsocketAddress(state)
    const owner: Participant | undefined = getOwner(state)

    let web3

    try {
      web3 = await getWeb3(websocketAddress)
    } catch (err) {
      dispatch(deployTokenError(err))
      return ''
    }

    if (!owner) {
      dispatch(deployTokenError(new Error(Errors.NO_ADMIN_FOUND)))
    }

    // we can dispatch deploy early here, as deploy is not to be confused with deployed
    const action = deployTokenAction(address || owner.address)
    dispatch(action)
    // now that the deploy action is in flight, do the actual evm deploy and wait for the address
    const contract = new Erc20(address || owner.address)

    try {
      // we can just re-use our deploy action payload from above
      const tokenAddress = await contract.deploy(web3, action.payload)
      dispatch(deployedToken(tokenAddress))

      return tokenAddress
    } catch(err) {
      dispatch(deployTokenError(err))

      return ''
    }
  }
}

// including with deployment actions as it fits best here
const resetToken = (): Action => ({ type: RESET_TOKEN })

export { deployToken, resetToken }
