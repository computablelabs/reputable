// Local Dependencies
import { Action } from '../../../interfaces'
import {
  attributeStoreAddressOk,
  attributeStoreAddressReset,
} from './actions'

/* Action Creators */
const setAttributeStoreAddress = (address: string): any => (
  async (dispatch: Function): Promise<Action> => (
    dispatch(attributeStoreAddressOk({ address }))
  )
)

const resetAttributeStoreAddress = (): any => (
  async (dispatch: Function): Promise<Action> => (
    dispatch(attributeStoreAddressReset())
  )
)

export {
  setAttributeStoreAddress,
  resetAttributeStoreAddress,
}

