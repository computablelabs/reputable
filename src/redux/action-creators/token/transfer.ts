import { EventLog } from 'web3/types.d'
import Erc20 from 'computable/dist/contracts/erc-20'
import { onData } from 'computable/dist/helpers'
import {
  FSA,
  Action,
  State,
  Transfer,
} from '../../../interfaces'
import { Errors } from '../../../constants'
import { address as addressSelector } from '../../selectors/token'
import { getOwner } from '../../selectors'
import { getWeb3 } from '../../../helpers'

// Action Types
export const TOKEN_TRANSFER_REQUEST = 'TOKEN_TRANSFER_REQUEST'
export const TOKEN_TRANSFER_OK = 'TOKEN_TRANSFER_OK'
export const TOKEN_TRANSFER_ERROR = 'TOKEN_TRANSFER_ERROR'
export const TOKEN_TRANSFER_RESET = 'TOKEN_TRANSFER_RESET'

// Actions
const tokenTransferRequest = (value: Transfer): FSA => ({
  type: TOKEN_TRANSFER_REQUEST,
  payload: value,
})

const tokenTransferOk = (value: Transfer): FSA => ({
  type: TOKEN_TRANSFER_OK,
  payload: value,
})

const tokenTransferError = (value: Error): FSA => ({
  type: TOKEN_TRANSFER_ERROR,
  payload: value,
})

const tokenTransferReset = (): FSA => ({
  type: TOKEN_TRANSFER_RESET,
  payload: {},
})

// Action Creators

// TODO type the returned thunk
const transfer = (to: string, amount: number | string, from?: string): any =>
  // TODO type the thunk args
  async (dispatch: Function, getState: Function): Promise<{ [key: string]: string } | undefined> => {
    const state: State = getState()
    const owner = getOwner(state)

    let web3

    try {
      web3 = await getWeb3()
    } catch (err) {
      dispatch(tokenTransferError(err))
      return undefined
    }

    // a token must have been deployed by this point
    const tokenAddress = addressSelector(state)
    const contract = new Erc20(owner.address)

    // instantiate a contract from the deployed token
    tokenAddress && await contract.at(web3, { address: tokenAddress }, { from: owner.address })

    if (!contract) {
      const error = new Error(Errors.NO_TOKEN_FOUND)
      dispatch(tokenTransferError(error))

      return undefined
    }

    const args: Transfer = { to, amount, from: from || owner.address }

    // dispatch that a request has been initialized
    dispatch(tokenTransferRequest(args))

    // try the actual on-chain transfer
    try {
      const emitter = contract.getEventEmitter('Transfer')

      // we can allow the contract to fallback on the default account it was made from
      contract.transfer(to, amount)

      const eventLog: EventLog = await onData(emitter)
      const eventValues = eventLog.returnValues

      const out = {
        from: eventValues.from,
        to: eventValues.to,
        amount: eventValues.value,
        id: eventLog.transactionHash,
      }

      dispatch(tokenTransferOk(out))

      return out
    } catch(err) {
      dispatch(tokenTransferError(err))

      return undefined
    }
  }

const resetTokenTransfer = (): Action => tokenTransferReset()

export { transfer, resetTokenTransfer }

