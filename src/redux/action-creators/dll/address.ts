// Local Dependencies
import { Action } from '../../../interfaces'
import {
  dllAddressOk,
  dllAddressReset,
} from './actions'

/* Action Creators */
const setDllAddress = (address: string): any => (
  async (dispatch: Function): Promise<Action> => (
    dispatch(dllAddressOk({ address }))
  )
)

const resetDllAddress = (): any => (
  async (dispatch: Function): Promise<Action> => (
    dispatch(dllAddressReset())
  )
)

export {
  setDllAddress,
  resetDllAddress,
}

