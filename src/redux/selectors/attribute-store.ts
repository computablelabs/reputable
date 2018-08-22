import { State, StateItem, Map } from '../../interfaces'

const model = 'attributeStoreAddress'

const getAttributeStoreAddress = (state: State = {}): string => {
  const stateItem: StateItem<Map> | undefined = state[model]
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

export { getAttributeStoreAddress }

