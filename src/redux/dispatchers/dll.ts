import store from '../store'
import { resetDll as reset } from '../action-creators/dll'

const resetDll = (): void => {
  store.dispatch(reset())
}

export { resetDll }

