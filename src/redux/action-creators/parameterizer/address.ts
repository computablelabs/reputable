// Local Dependencies
import { Action } from '../../../interfaces'
import {
  parameterizerAddressOk,
  parameterizerAddressReset,
} from './actions'

/* Action Creators */
const setParameterizerAddress = (address: string): any => (
  async (dispatch: Function): Promise<Action> => (
    dispatch(parameterizerAddressOk({ address }))
  )
)

const resetParameterizerAddress = (): any => (
  async (dispatch: Function): Promise<Action> => (
    dispatch(parameterizerAddressReset())
  )
)

export {
  setParameterizerAddress,
  resetParameterizerAddress,
}

