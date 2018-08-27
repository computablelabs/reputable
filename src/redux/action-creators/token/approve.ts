import Erc20 from 'computable/dist/contracts/erc-20'
import { EventLog } from 'web3/types.d'
import { onData } from 'computable/dist/helpers'
import {
  FSA,
  Action,
  State,
  Map,
  Participant,
  Approval,
} from '../../../interfaces'
import { Errors } from '../../../constants'
import { getWeb3 } from '../../../initializers'
import { getOwner, getWebsocketAddress, getTokenAddress } from '../../selectors'

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

const tokenApproveOk = (value: Approval): FSA => ({
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
interface TokenApproveParams {
  address: string
  amount: number
  from?: string
}
const approve = ({ address, amount, from }: TokenApproveParams): any => (
  async (dispatch: Function, getState: Function): Promise<Map|undefined> => {
    const state: State = getState()

    const args = { address, amount, from }
    dispatch(tokenApproveRequest(args))

    try {
      const owner: Participant|undefined = getOwner(state)
      if (!owner) {
        throw new Error(Errors.NO_ADMIN_FOUND)
      }

      const websocketAddress: string = getWebsocketAddress(state)
      if (!websocketAddress) {
        throw new Error(Errors.NO_WEBSOCKETADDRESS_FOUND)
      }

      const web3 = await getWeb3(websocketAddress)

      const contractAddress = getTokenAddress(state)
      if (!contractAddress) {
        throw new Error(Errors.NO_TOKEN_FOUND)
      }

      const contract = new Erc20(owner.address)
      await contract.at(web3, { address: contractAddress })

      const emitter = contract.getEventEmitter('Approval')

      contract.approve(address, amount, { from: from || owner.address })

      const eventLog: EventLog = await onData(emitter)
      const eventValues = eventLog.returnValues

      const out = {
        address: eventValues.spender,
        from: eventValues.owner,
        amount: eventValues.value,
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
  async (dispatch: Function): Promise<Action> => (
    dispatch(tokenApproveReset())
  )
)

export { approve, resetTokenApprove }

