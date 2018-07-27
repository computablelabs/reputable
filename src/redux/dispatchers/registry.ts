import { Nos } from 'computable/dist/types'
import store from '../store'
import {
  apply as getApplicant,
  deployRegistry as deploy,
  resetRegistry as reset,
} from '../action-creators/registry'

// TODO revisit now that we have some real implementations in. Likely it should be an async promise for a TransactionReceipt like token#approve
const apply = (name:string, deposit?:Nos, data?:string): void => {
  // TODO default for deposit? App needs/has parameterizer defaults?
  store.dispatch(getApplicant(name, deposit || 0, data)) // this should move an application into the applicants list
}

const deployRegistry = async (name:string, address?:string): Promise<string> =>
  store.dispatch(deploy(name, address))

const resetRegistry = (): void => {
  store.dispatch(reset())
}

export { apply, deployRegistry, resetRegistry }
