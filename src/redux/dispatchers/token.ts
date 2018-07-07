import { Nos } from 'computable/dist/types'
import store from '../store'
import { resetToken as reset, deployToken as deploy } from '../action-creators/token'

const deployToken = async (address?:string, supply?:Nos): Promise<string> => {
  return store.dispatch(deploy(address, supply))
}

const resetToken = (): void => {
  store.dispatch(reset())
}

export { deployToken, resetToken }
