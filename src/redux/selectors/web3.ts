import { State, StateItem } from '../../interfaces'

const model = 'websocketAddress'

const getWebsocketAddress = (state: State = {}): string => {
  const stateItem: StateItem<string> | undefined = state[model]
  if (!stateItem) {
    return ''
  }

  const data: { [key: string]: string } = stateItem.data
  if (!data) {
    return ''
  }

  const key: string = Object.keys(data)[0]
  if (!key) {
    return ''
  }

  return data[key]
}

export { getWebsocketAddress }

