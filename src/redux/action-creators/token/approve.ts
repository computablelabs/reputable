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
  tokenApproveRequest,
  tokenApproveOk,
  tokenApproveError,
  tokenApproveReset,
} from './actions'

/* Action Creators */
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

      let out: any = {}

      const emitter = contract.getEventEmitter('Approval') as EventEmitter
      emitter.on('data', async (log: EventLog) => {
        const eventValues = log.returnValues

        out = {
          address: eventValues.spender,
          from: eventValues.owner,
          amount: eventValues.value,
        }

        dispatch(tokenApproveOk(out))
      })

      await contract.approve(address, amount, { from: from || owner.address })

      emitter.unsubscribe()

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

