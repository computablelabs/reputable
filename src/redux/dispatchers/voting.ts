import store from '../store'
import { deployVoting as deploy } from '../action-creators/voting'

const deployVoting = async (address?:string): Promise<string> =>
  store.dispatch(deploy(address))

export { deployVoting }
