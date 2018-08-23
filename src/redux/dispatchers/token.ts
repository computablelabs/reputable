import { Nos } from 'computable/dist/types'
import { GenericMap } from '../../interfaces'
import store from '../store'
import {
  resetTokenAddress,
  deployToken as deploy,

  approve as approval,
  transfer as transferral,
} from '../action-creators/token'
import { resetTokenApprove } from '../action-creators/token/approve'
import { resetTokenTransfer } from '../action-creators/token/transfer'

const approve = async (
  address: string,
  amount: Nos,
  from: string,
): Promise<GenericMap<string>> => (
  store.dispatch(approval(address, amount, from))
)

const transfer = async (
  to: string,
  amount: Nos,
  from: string,
): Promise<GenericMap<string>> => (
  store.dispatch(transferral(to, amount, from))
)

const deployToken = async (supply?: number): Promise<string> => (
  store.dispatch(deploy(supply))
)

const resetToken = (): void => {
  store.dispatch(resetTokenAddress())
  store.dispatch(resetTokenApprove())
  store.dispatch(resetTokenTransfer())
}

export { approve, transfer, deployToken, resetToken }

