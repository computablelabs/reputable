import store from '../store'
import { deployDll as deploy, resetDll as reset } from '../action-creators/dll'

const deployDll = async (address:string): Promise<string> =>
  store.dispatch(deploy(address))

const resetDll = (): void => {
  store.dispatch(reset())
}

export { deployDll, resetDll }
