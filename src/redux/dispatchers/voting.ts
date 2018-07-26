import store from '../store'
import { deployVoting as deploy, resetVoting as reset } from '../action-creators/voting'

const deployVoting = async (address?:string): Promise<string> =>
  store.dispatch(deploy(address))

const resetVoting = (): void => {
  store.dispatch(reset())
}

export { deployVoting, resetVoting }
