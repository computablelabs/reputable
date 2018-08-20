import { EventLog } from 'web3/types.d'
import { onData } from 'computable/dist/helpers'
import {
  FSA,
  Action,
  State,
  Approval,
} from '../../../interfaces'
import { getOwner } from '../../selectors'
import { getTokenContract } from '../../../helpers'

// Action Types
export const TOKEN_APPROVE_REQUEST = 'TOKEN_APPROVE_REQUEST'
export const TOKEN_APPROVE_OK = 'TOKEN_APPROVE_OK'
export const TOKEN_APPROVE_ERROR = 'TOKEN_APPROVE_ERROR'
export const TOKEN_APPROVE_RESET = 'TOKEN_APPROVE_RESET'

// Actions
const tokenApproveRequest = (value: Approval): FSA => ({
  type: TOKEN_APPROVE_REQUEST,
  payload: value,
})

const tokenApproveOk = (value: { [key: string]: string }): FSA => ({
  type: TOKEN_APPROVE_OK,
  payload: value,
})

const tokenApproveError = (value: Error): FSA => ({
  type: TOKEN_APPROVE_ERROR,
  payload: value,
})

const tokenApproveReset = (): FSA => ({
  type: TOKEN_APPROVE_RESET,
  payload: {},
})

// Action Creators

// TODO type the returned thunk vs `any`
const approve = (address: string, amount: number | string, from?: string): any =>
  async (dispatch: Function, getState: Function): Promise<{ [key: string]: string } | undefined> => {
    const state: State = getState()
    const owner = getOwner(state)

    let contract

    try {
      contract = await getTokenContract()
    } catch (err) {
      dispatch(tokenApproveError(err))

      return undefined
    }

    const args: Approval = { address, amount, from: from || owner.address }

    // dispatch that a request has been initialized
    dispatch(tokenApproveRequest(args))

    try {
      const emitter = contract.getEventEmitter('Approval')

      // we can allow the contract to fallback to the account it was instantiated with as `from`
      contract.approve(address, amount, { from })

      const eventLog: EventLog = await onData(emitter)
      const eventValues = eventLog.returnValues

      const out = {
        owner: eventValues.owner,
        spender: eventValues.spender,
        value: eventValues.value,
      }

      dispatch(tokenApproveOk(out))

      return out
    } catch(err) {
      dispatch(tokenApproveError(err))

      return undefined
    }
  }

const resetTokenApprove = (): Action => tokenApproveReset()

export { approve, resetTokenApprove }

