// Local Dependencies
import { attributeStoreReset } from './actions'

/* Action Creators */
const resetAttributeStore = (): any => (
  async (dispatch: Function): Promise<void> => (
    dispatch(attributeStoreReset())
  )
)

export { resetAttributeStore }

