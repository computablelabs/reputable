import Web3 from 'web3'
import { TransactionReceipt } from 'web3/types.d'
import { Nos } from 'computable/dist/types'
import Erc20 from 'computable/dist/contracts/erc-20'
import { address as addressSelector } from '../../selectors/token'
import {
  FSA,
  State,
  Transfer,
} from '../../../interfaces'
import {
  TRANSFER,
  TRANSFER_ERROR,
  TRANSFERRED,
  Errors,
} from '../../../constants'

/**
 * support methods for the transfer Action Creator
 */
const transferral = (type:string, to:string, amount:Nos, from:string): FSA => {
  const payload:Transfer = { to, amount, from }
  return { type, payload }
}

const transferError = (err:Error): FSA => (
  { type: TRANSFER_ERROR, payload: err }
)

// TODO type the returned thunk
const transfer = (to:string, amount:Nos, from:string): any => {
  // TODO type the thunk args
  return async (dispatch:any, getState:any): Promise<TransactionReceipt|null> => {
    const state:State = getState(),
      // a token must have been deployed by this point
      tokenAddress = addressSelector(state),
      ws = state.websocketAddress || '',
      web3 = new Web3(new Web3.providers.WebsocketProvider(ws)),
      contract = new Erc20(from)
    // instantiate a contract from the deployed token
    tokenAddress && await contract.at(web3, { address: tokenAddress })

    let tx = null

    if (!contract) dispatch(transferError(new Error(Errors.NO_TOKEN_FOUND)))
    else {
      // dispatch transfer early as an in-flight notification
      dispatch(transferral(TRANSFER, to, amount, from))
      // try the actual on-chain transfer
      try {
        // we can allow the contract to fallback on the default account it was made from
        tx = await contract.transfer(to, amount)
        dispatch(transferral(TRANSFERRED, to, amount, from))
      } catch(err) {
        dispatch(transferError(err))
      }
    }

    return tx
  }
}

export {
  transfer,
}
