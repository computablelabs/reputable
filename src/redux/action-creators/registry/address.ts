// Local Dependencies
import { registryAddressOk, registryAddressReset } from './actions'

/* Action Creators */
const setRegistryAddress = (registryAddress: string): any => (
  async (dispatch: Function): Promise<void> => {
    dispatch(registryAddressOk({ address: registryAddress }))
  }
)

const resetRegistryAddress = (): any => (
  async (dispatch: Function): Promise<void> => {
    dispatch(registryAddressReset())
  }
)

export { setRegistryAddress, resetRegistryAddress }

