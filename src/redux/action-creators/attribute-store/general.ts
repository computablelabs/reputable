// Local Dependencies
import { Action } from '../../../interfaces'
import { attributeStoreReset } from './actions'

/* Action Creators */
const resetAttributeStore = (): any => (
  async (dispatch: Function): Promise<Action> => (
    dispatch(attributeStoreReset())
  )
)

export { resetAttributeStore }

