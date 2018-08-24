import Erc20 from 'computable/dist/contracts/erc-20'
import { EventLog } from 'web3/types.d'
import { onData } from 'computable/dist/helpers'
import {
  FSA,
  Action,
  State,
  Map,
  Participant,
  Transfer,
} from '../../../interfaces'
import { Errors } from '../../../constants'
import { getWeb3 } from '../../../initializers'
import { getOwner, getWebsocketAddress, getTokenAddress } from '../../selectors'

// Action Types
export const TOKEN_TRANSFER_REQUEST = 'TOKEN_TRANSFER_REQUEST'
export const TOKEN_TRANSFER_OK = 'TOKEN_TRANSFER_OK'
export const TOKEN_TRANSFER_ERROR = 'TOKEN_TRANSFER_ERROR'
export const TOKEN_TRANSFER_RESET = 'TOKEN_TRANSFER_RESET'

// Actions
const tokenTransferRequest = (value: Map): FSA => ({
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
// TODO `from` doesn't appear to be used
interface RegistryTransferParams {
  to: string
  amount: number
  from?: string
}
const transfer = ({ to, amount, from }: RegistryTransferParams): any =>
  async (dispatch: Function, getState: Function): Promise<Map|undefined> => {
    const state: State = getState()

    const args = { to, amount, from }
    dispatch(tokenTransferRequest(args))

    try {
      const owner: Participant = getOwner(state)
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

      const emitter = contract.getEventEmitter('Transfer')

      // we can allow the contract to fallback on the default account it was made from
      contract.transfer(to, amount)

      const eventLog: EventLog = await onData(emitter)
      const eventValues = eventLog.returnValues

      const out = {
        from: eventValues.from,
        to: eventValues.to,
        amount: eventValues.value,
      }

      dispatch(tokenTransferOk(out))

      return out
    } catch(err) {
      dispatch(tokenTransferError(err))

      return undefined
    }
  }

const resetTokenTransfer = (): any => (
  async (dispatch: Function): Promise<Action> => (
    dispatch(tokenTransferReset())
  )
)

export { transfer, resetTokenTransfer }

