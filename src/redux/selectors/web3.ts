import { State, StateItem, Deployed } from '../../interfaces'

const model = 'web3'

const getWebsocketAddress = (state: State = {}): string => {
  const stateItem: StateItem<Deployed>|undefined = state[model]
  if (!stateItem) {
    return ''
  }

  const data: Deployed = stateItem.data
  if (!data) {
    return ''
  }

  return data.address
}

export { getWebsocketAddress }

