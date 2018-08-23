import { State, StateItem, Token } from '../../interfaces'

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

export {
  getToken,
  getTokenAddress,
}

