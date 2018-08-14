import { State, Approval } from '../../interfaces'
import utils from './helpers'

const model = 'tokenApprovals'

const getApprovals = (state: State = {}, { ids }: any = {}): Approval[] =>
  utils.getList({ state, model, ids })

const getApproval = (state: State = {}, key: string): Approval =>
  utils.getItem({ state, model, key })

export { getApprovals, getApproval }

