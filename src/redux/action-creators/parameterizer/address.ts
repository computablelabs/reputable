// Local Dependencies
import {
  parameterizerAddressOk,
  parameterizerAddressReset,
} from './actions'

/* Action Creators */
const setParameterizerAddress = (address: string): any => (
  async (dispatch: Function): Promise<void> => (
    dispatch(parameterizerAddressOk({ address }))
  )
)

const resetParameterizerAddress = (): any => (
  async (dispatch: Function): Promise<void> => (
    dispatch(parameterizerAddressReset())
  )
)

export {
  setParameterizerAddress,
  resetParameterizerAddress,
}

