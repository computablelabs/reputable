// Dependencies
import Erc20 from 'computable/dist/contracts/erc-20'
import { TransactionReceipt } from 'web3/types'

// Local Dependencies
import { State } from '../../../interfaces'
import { getTokenContract } from '../../contracts'
import {
  tokenTransferRequest,
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
  async (dispatch: Function, getState: Function): Promise<TransactionReceipt|void> => {
    const state: State = getState()

    const args = { to, amount, from }
    dispatch(tokenTransferRequest(args))

    try {
      const contract: Erc20 = await getTokenContract(state)

      // we can allow the contract to fallback on the default account it was made from
      const tx: TransactionReceipt = await contract.transfer(to, amount)

      return tx
    } catch(err) {
      dispatch(tokenTransferError(err))
    }
  }

const resetTokenTransfer = (): any => (
  async (dispatch: Function): Promise<void> => {
    dispatch(tokenTransferReset())
  }
)

export { transfer, resetTokenTransfer }

