// Local Dependencies
import {
  dllAddressOk,
  dllAddressReset,
} from './actions'

/* Action Creators */
const setDllAddress = (address: string): any => (
  async (dispatch: Function): Promise<void> => (
    dispatch(dllAddressOk({ address }))
  )
)

const resetDllAddress = (): any => (
  async (dispatch: Function): Promise<void> => (
    dispatch(dllAddressReset())
  )
)

export {
  setDllAddress,
  resetDllAddress,
}

