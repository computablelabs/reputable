import store from '../store'
import { resetParameterizerAddress as resetAddress } from '../action-creators/parameterizer'

const resetParameterizer = (): void => {
  store.dispatch(resetAddress())
}

export { resetParameterizer }

