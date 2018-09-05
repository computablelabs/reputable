import store from '../store'
import {
  resetRegistryAddress,
  resetRegistryListings,
} from '../action-creators/registry'

const resetRegistry = (): void => {
  store.dispatch(resetRegistryAddress())
  store.dispatch(resetRegistryListings())
}

export { resetRegistry }

