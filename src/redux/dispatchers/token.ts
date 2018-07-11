import { TransactionReceipt } from 'web3/types.d'
import { Nos } from 'computable/dist/types'
import store from '../store'
import {
  resetToken as reset,
  deployToken as deploy,
  approve as approveAction,
} from '../action-creators/token'

const approve = async (address:string, amount:Nos, from:string): Promise<TransactionReceipt> =>
  store.dispatch(approveAction(address, amount, from))

const deployToken = async (address?:string, supply?:Nos): Promise<string> =>
  store.dispatch(deploy(address, supply))

const resetToken = (): void => {
  store.dispatch(reset())
}

export { approve, deployToken, resetToken }
