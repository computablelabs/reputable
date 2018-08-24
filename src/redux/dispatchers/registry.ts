import store from '../store'
import {
  resetRegistryAddress as resetAddress,
  resetRegistryApply as resetApplicants,
} from '../action-creators/registry'

const resetRegistry = (): void => {
  store.dispatch(resetAddress())
  store.dispatch(resetApplicants())
}

export { resetRegistry }

