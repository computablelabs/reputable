import { State, Registry } from '../../interfaces'

const model = 'registry'

const getRegistry = (state: State = {}): Registry | undefined => {
  const stateItem: Registry | undefined = state[model]
  if (!stateItem) {
    return undefined
  }

  return stateItem ?
    stateItem : undefined
}

const getRegistryAddress = (state: State = {}): string => {
  const registry: Registry | undefined = getRegistry(state)

  return registry && registry.address ?
    registry.address : ''
}

export { getRegistry, getRegistryAddress }

