import Erc20 from 'computable/dist/contracts/erc-20'
import {
  EventEmitter,
  EventLog,
  Action,
  State,
  Map,
  Participant,
} from '../../../interfaces'
import { Errors } from '../../../constants'
import { getWeb3 } from '../../../initializers'
import { getOwner, getWebsocketAddress, getTokenAddress } from '../../selectors'
import {
  tokenTransferRequest,
  tokenTransferOk,
  tokenTransferError,
  tokenTransferReset,
} from './actions'

/* Action Creators */
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

      let out: any = {}

      const emitter = contract.getEventEmitter('Transfer') as EventEmitter
      emitter.on('data', async (log: EventLog) => {
        const eventValues = log.returnValues

        out = {
          from: eventValues.from,
          to: eventValues.to,
          amount: eventValues.value,
        }

        dispatch(tokenTransferOk(out))
      })

      // we can allow the contract to fallback on the default account it was made from
      await contract.transfer(to, amount)

      emitter.unsubscribe()

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

