import { State, StateItem, Deployed } from '../../interfaces'

const model = 'dll'

const getDllAddress = (state: State = {}): string => {
  const stateItem: StateItem<Deployed>|undefined = state[model]
  if (!stateItem) {
    return ''
  }

  const data = stateItem.data
  if (!data) {
    return ''
  }

  return data.address
}

export { getDllAddress }

