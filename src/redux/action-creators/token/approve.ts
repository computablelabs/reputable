import { EventLog } from 'web3/types.d'
import { onData } from 'computable/dist/helpers'
import {
  FSA,
  Action,
  State,
  Map
} from '../../../interfaces'
import { Errors } from '../../../constants'
import {
  getWebsocketAddress,
  getOwner,
  getTokenAddress,
} from '../../selectors'
import { getWeb3, getTokenContract } from '../../../helpers'

// Action Types
export const TOKEN_APPROVE_REQUEST = 'TOKEN_APPROVE_REQUEST'
export const TOKEN_APPROVE_OK = 'TOKEN_APPROVE_OK'
export const TOKEN_APPROVE_ERROR = 'TOKEN_APPROVE_ERROR'
export const TOKEN_APPROVE_RESET = 'TOKEN_APPROVE_RESET'

// Actions
const tokenApproveRequest = (value: Map): FSA => ({
  type: TOKEN_APPROVE_REQUEST,
  payload: value,
})

const tokenApproveOk = (value: Map): FSA => ({
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
const approve = (address: string, amount: number | string, from?: string): any => (
  async (dispatch: Function, getState: Function): Promise<Map|undefined> => {
    const state: State = getState()

    const args = { address, amount, from }
    dispatch(tokenApproveRequest(args))

    const owner = getOwner(state)
    if (!owner) {
      const error = new Error(Errors.NO_ADMIN_FOUND)
      dispatch(tokenApproveError(error))
      return undefined
    }

    let web3
    const websocketAddress: string = getWebsocketAddress(state)
    try {
      web3 = await getWeb3(websocketAddress)
    } catch (err) {
      dispatch(tokenApproveError(err))
      return undefined
    }

    let contract
    const tokenAddress = getTokenAddress(state)
    try {
      contract = await getTokenContract({ web3, address: tokenAddress, owner })
    } catch (err) {
      dispatch(tokenApproveError(err))
      return undefined
    }

    try {
      const emitter = contract.getEventEmitter('Approval')

      contract.approve(address, amount, { from: from || owner.address })

      const eventLog: EventLog = await onData(emitter)
      const eventValues = eventLog.returnValues

      // TODO(geoff) `address` is the key in global state, but it has no value
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
)

const resetTokenApprove = (): any => (
  async (dispatch: Function, getState: Function): Promise<Action> => (
    dispatch(tokenApproveReset())
  )
)

export { approve, resetTokenApprove }

