import { State, StateItem, Token, Approval, Transfer } from '../../interfaces'

const model = 'token'

const getToken = (state: State = {}): Token|undefined => {
  const stateItem: StateItem<Token>|undefined = state[model]
  if (!stateItem) {
    return undefined
  }

  return stateItem.data
}

const getTokenAddress = (state: State = {}): string => {
  const token: Token|undefined = getToken(state)
  if (!token) {
    return ''
  }

  return token.address || ''
}

const getApprovals = (state: State = {}): Approval[] => {
  const stateItem: StateItem<Token>|undefined = state[model]
  if (!stateItem) {
    return []
  }

  const data: Token = stateItem.data
  if (!data) {
    return []
  }

  const approvals = data.approvals
  if (!approvals) {
    return []
  }

  return approvals
}

const getTransfers = (state: State = {}, { ids }: any = {}): Transfer[] => {
  const stateItem: StateItem<Token>|undefined = state[model]
  if (!stateItem) {
    return []
  }

  const data: Token = stateItem.data
  if (!data) {
    return []
  }

  const transfers = data.transfers
  if (!transfers) {
    return []
  }

  return transfers
}

export {
  getToken,
  getTokenAddress,
  getApprovals,
  getTransfers,
}

