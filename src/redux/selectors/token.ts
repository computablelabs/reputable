import {
  State,
  Token,
  Approval,
  Transfer,
} from '../../interfaces'

const token = (state:State): Token|undefined => state.token

const address = (state:State): string|undefined => state.token && state.token.address

const approvals = (state:State): Approval[]|undefined => state.token && state.token.approvals

const transfers = (state:State): Transfer[]|undefined => state.token && state.token.transfers

export {
  token,
  address,
  approvals,
  transfers,
}
