import { State, Transfer } from '../../interfaces'
import utils from './helpers'

const model = 'tokenTransfers'

const getTransfers = (state: State = {}, { ids }: any = {}): Transfer[] =>
  utils.getList({ state, model, ids })

const getTransfer = (state: State = {}, key: string): Transfer =>
  utils.getItem({ state, model, key })

export { getTransfers, getTransfer }

