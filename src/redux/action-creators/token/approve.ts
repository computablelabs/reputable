// Dependencies
import Erc20 from 'computable/dist/contracts/erc-20'
import { TransactionReceipt } from 'web3/types'

// Local Dependencies
import { State, Participant } from '../../../interfaces'
import { getWeb3, getTokenContract } from '../../contracts'
import { Errors } from '../../../constants'
import { getOwner } from '../../selectors'
import {
  tokenApproveRequest,
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
  async (dispatch: Function, getState: Function): Promise<TransactionReceipt|void> => {
    const state: State = getState()

    const args = { address, amount, from }
    dispatch(tokenApproveRequest(args))

    try {
      const owner: Participant|undefined = getOwner(state)
      if (!owner) {
        throw new Error(Errors.NO_ADMIN_FOUND)
      }

      const web3 = await getWeb3(state)
      const contract: Erc20 = await getTokenContract(state)

      const tx = await contract.approve(
        web3,
        address,
        amount,
        { from: from || owner.address },
      )

      return tx
    } catch(err) {
      dispatch(tokenApproveError(err))
    }
  }
)

const resetTokenApprove = (): any => (
  async (dispatch: Function): Promise<void> => {
    dispatch(tokenApproveReset())
  }
)

export { approve, resetTokenApprove }

