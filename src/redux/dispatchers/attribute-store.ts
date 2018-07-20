import store from '../store'
import deploy from '../action-creators/attribute-store'

const deployAttributeStore = async (address:string): Promise<string> =>
  store.dispatch(deploy(address))

export default deployAttributeStore
