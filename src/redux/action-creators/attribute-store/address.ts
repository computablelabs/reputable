// Local Dependencies
import {
  attributeStoreAddressOk,
  attributeStoreAddressReset,
} from './actions'

/* Action Creators */
const setAttributeStoreAddress = (address: string): any => (
  async (dispatch: Function): Promise<void> => (
    dispatch(attributeStoreAddressOk({ address }))
  )
)

const resetAttributeStoreAddress = (): any => (
  async (dispatch: Function): Promise<void> => (
    dispatch(attributeStoreAddressReset())
  )
)

export {
  setAttributeStoreAddress,
  resetAttributeStoreAddress,
}

