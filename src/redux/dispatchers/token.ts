import { Nos } from 'computable/dist/types'
import store from '../store'
import {
  resetToken as reset,
  deployToken as deploy,
  approve as approval,
  transfer as transferral,
} from '../action-creators/token'
import { resetTokenApprove } from '../action-creators/token/approve'
import { resetTokenTransfer } from '../action-creators/token/transfer'

const approve = async (address:string, amount:Nos, from:string): Promise<{ [key: string]: string }> =>
  store.dispatch(approval(address, amount, from))

const transfer = async (to:string, amount:Nos, from:string): Promise<{ [key: string]: string }> =>
  store.dispatch(transferral(to, amount, from))

const deployToken = async (address?:string, supply?:Nos): Promise<string> =>
  store.dispatch(deploy(address, supply))

const resetToken = (): void => {
  store.dispatch(reset())
  store.dispatch(resetTokenApprove())
  store.dispatch(resetTokenTransfer())
}

export { approve, transfer, deployToken, resetToken }
