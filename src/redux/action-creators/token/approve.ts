import Web3 from 'web3'
import { TransactionReceipt } from 'web3/types.d'
import { Nos } from 'computable/dist/types'
import Erc20 from 'computable/dist/contracts/erc-20'
import { address as addressSelector } from '../../selectors/token'
import {
  FSA,
  State,
  Approval,
} from '../../../interfaces'
import {
  APPROVE,
  APPROVE_ERROR,
  APPROVED,
  Errors,
} from '../../../constants'

/**
 * support actions for the thunk approve action
 *
 * Approve and Approved send the same args, with approve functioning as an
 * in-flight notification. We dont, via the reducer, add the approval to the state tree
 * however until Approved
 */
const approval = (type:string, address:string, amount:Nos, from: string): FSA => {
  const payload:Approval = { address, amount, from }
  return { type, payload }
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
      tokenAddress = addressSelector(state),
      // we can assume that if a token has been deployed a ws has been provided
      ws = state.websocketAddress || '',
      web3 = new Web3(new Web3.providers.WebsocketProvider(ws)),
      contract = new Erc20(from)
    // instantiate a higher order contract with the deployed contract address
    tokenAddress && await contract.at(web3, { address: tokenAddress })

    let tx = null

    if (!contract) dispatch(approvalError(new Error(Errors.NO_TOKEN_FOUND)))
    else {
      // dispatch approve early as an in-flight notification
      dispatch(approval(APPROVE, address, amount, from))
      try {
        // we can allow the contract to fallback to the account it was instantiated with as `from`
        tx = await contract.approve(address, amount)
        dispatch(approval(APPROVED, address, amount, from))
      } catch(err) {
        dispatch(approvalError(err))
      }
    }

    return tx
  }
}

export {
  approve,
}
