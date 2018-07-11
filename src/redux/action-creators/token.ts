// TODO split the actions up into subdirectories like `token/deploy` and `token/approve` etc...

import Web3 from 'web3'
import { TransactionReceipt } from 'web3/types.d'
import { Nos } from 'computable/dist/types'
import { Erc20DeployParams } from 'computable/dist/interfaces'
import Erc20 from 'computable/dist/contracts/erc-20'
import {
  Void,
  Action,
  FSA,
  State,
  DeployedToken,
  Participant,
  Approval,
} from '../../interfaces'
import {
  APPROVE,
  APPROVE_ERROR,
  APPROVED,
  DEPLOY_TOKEN,
  DEPLOY_TOKEN_ERROR,
  DEPLOYED_TOKEN,
  RESET_TOKEN,
  TokenDefaults,
  Errors,
} from '../../constants'

/**
 * support actions for the thunk approve action
 *
 * ApproveAction and Approved send the same args, with approve functioning as an
 * in-flight notification. We dont, via the reducer, add the approval to the state tree
 * however until Approved
 */
const approveAction = (address:string, amount:Nos, from: string): FSA => {
  const payload:Approval = { address, amount, from }
  return { type: APPROVE, payload }
}

const approval = (address:string, amount:Nos, from: string): FSA => {
  const payload:Approval = { address, amount, from }
  return { type: APPROVED, payload }
}

const approvalError = (err:Error): FSA => (
  { type: APPROVE_ERROR, payload: err }
)

// TODO type the returned thunk vs `any`
const approve = (address:string, amount:Nos, from:string): any => {
  // TODO type the dispatch and getState args
  return async (dispatch:any, getState:any): Promise<TransactionReceipt|null> => {
    const state:State = getState(),
      // a token must have been deployed by this point
      token = state.token,
      tokenAddress = token && token.address,
      // we can assume that if a token has been deployed a ws has been provided
      ws = state.websocketAddress || '',
      web3 = new Web3(new Web3.providers.WebsocketProvider(ws)),
      contract = new Erc20(from)

    tokenAddress && await contract.at(web3, { address: tokenAddress })

    let tx = null

    if (!contract) dispatch(approvalError(new Error(Errors.NO_TOKEN_FOUND)))
    else {
      // dispatch approve early as an in-flight notification
      dispatch(approveAction(address, amount, from))
      try {
        // we can allow the contract to fallback to the account it was instantiated with as `from`
        tx = await contract.approve(address, amount)
        dispatch(approval(address, amount, from))
      } catch(err) {
        dispatch(approvalError(err))
      }
    }

    return tx
  }
}

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

const deployedToken = (address:string): FSA => {
  const payload:DeployedToken = { address }
  return { type: DEPLOYED_TOKEN, payload }
}

const deployTokenError = (err:Error): FSA => (
  { type: DEPLOY_TOKEN_ERROR, payload: err }
)

const deployToken = (address?:string, supply?:Nos): any => {
  return async (dispatch:any, getState:any): Promise<string> => {
    const state:State = getState(),
      websocketAddress = state.websocketAddress,
      admin:Participant|undefined = state.participants && state.participants[0]

    let tokenAddress = ''

    if (!websocketAddress) dispatch(deployTokenError(new Error(Errors.NO_WEBSOCKETADDRESS_FOUND)))
    else if (!admin) dispatch(deployTokenError(new Error(Errors.NO_ADMIN_FOUND)))
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

const resetToken = (): Action => ({ type: RESET_TOKEN })

export {
  approve,
  deployToken,
  resetToken,
}
