import { Nos } from 'computable/dist/types'
import { TransactionReceipt } from 'web3/types.d'
import { State } from '../../interfaces'
import store from '../store'
import {
  apply as getApplicant,
  deployRegistry as deploy,
  resetRegistry as reset,
} from '../action-creators/registry'
import { getRegistryAddress } from '../selectors'

const apply = (listing: string, userAddress:string, deposit?:Nos, data?:string): Promise<TransactionReceipt> => {
  const state: State = store.getState()
  const registryAddress = getRegistryAddress(state)

  // TODO default for deposit? App needs/has parameterizer defaults?
  // this should move an application into the applicants list
  return store.dispatch(getApplicant(registryAddress, listing, userAddress, deposit || 0, data))
}

const deployRegistry = async (name:string, address?:string): Promise<string> =>
  store.dispatch(deploy(name, address))

const resetRegistry = (): void => {
  store.dispatch(reset())
}

export { apply, deployRegistry, resetRegistry }
