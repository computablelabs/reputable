import { State, StateItem, Parameterizer } from '../../interfaces'

const model = 'parameterizer'

const getParameterizer = (state: State = {}): Parameterizer|undefined => {
  const stateItem: StateItem<Parameterizer>|undefined = state[model]
  if (!stateItem) {
    return undefined
  }

  return stateItem.data
}

const getParameterizerAddress = (state: State = {}): string => {
  const parameterizer: Parameterizer|undefined = getParameterizer(state)
  if (!parameterizer || !parameterizer.address) {
    return ''
  }

  return parameterizer.address
}

export { getParameterizer, getParameterizerAddress }

