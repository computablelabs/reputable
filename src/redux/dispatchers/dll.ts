import store from '../store'
import deploy from '../action-creators/dll'

const deployDll = async (address:string): Promise<string> =>
  store.dispatch(deploy(address))

export default deployDll
