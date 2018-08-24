import { State, StateItem, Registry } from '../../interfaces'

const model = 'registry'

const getRegistry = (state: State = {}): Registry|undefined => {
  const stateItem: StateItem<Registry>|undefined = state[model]
  if (!stateItem) {
    return undefined
  }

  return stateItem.data
}

const getRegistryAddress = (state: State = {}): string => {
  const registry: Registry|undefined = getRegistry(state)
  if (!registry || !registry.address) {
    return ''
  }

  return registry.address
}

export { getRegistry, getRegistryAddress }

