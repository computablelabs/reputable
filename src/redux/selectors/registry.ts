import { State, Registry } from '../../interfaces'

const registry = (state:State): Registry|undefined => state.registry

const address = (state:State): string|undefined => state.registry && state.registry.address

export { registry, address }
