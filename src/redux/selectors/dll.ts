import { State, StateItem } from '../../interfaces'

const model = 'dllAddress'

const getDllAddress = (state: State = {}): string => {
  const stateItem: StateItem<string> | undefined = state[model]
  if (!stateItem) {
    return ''
  }

  const data = stateItem.data
  if (!data) {
    return ''
  }

  const keys = Object.keys(data)

  return keys.length ?
    data[keys[0]] : ''
}

export {
  getDllAddress,
}

