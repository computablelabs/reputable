import { State, StateItem, GenericMap } from '../../interfaces'

const model = 'web3'

const getWebsocketAddress = (state: State = {}): string => {
  const stateItem: StateItem<GenericMap<string>> | undefined = state[model]
  if (!stateItem) {
    return ''
  }

  const data: GenericMap<string> = stateItem.data
  if (!data) {
    return ''
  }

  return data.address
}

export { getWebsocketAddress }

