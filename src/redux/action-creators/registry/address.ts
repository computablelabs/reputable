// Local Dependencies
import { Action } from '../../../interfaces'
import {
  registryAddressOk,
  registryAddressReset,
} from './actions'

/* Action Creators */
const setRegistryAddress = (registryAddress: string): any => (
  async (dispatch: Function): Promise<Action> => (
    dispatch(registryAddressOk({ address: registryAddress }))
  )
)

const resetRegistryAddress = (): any => (
  async (dispatch: Function): Promise<Action> => (
    dispatch(registryAddressReset())
  )
)

export { setRegistryAddress, resetRegistryAddress }

