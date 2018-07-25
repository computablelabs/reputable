import store from '../store'
import { deployAttributeStore as deploy, resetAttributeStore as reset } from '../action-creators/attribute-store'

const deployAttributeStore = async (address:string): Promise<string> =>
  store.dispatch(deploy(address))

const resetAttributeStore = (): void => {
  store.dispatch(reset())
}

export { deployAttributeStore, resetAttributeStore }
