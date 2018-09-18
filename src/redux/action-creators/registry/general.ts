// Local Dependencies
import { Action } from '../../../interfaces'
import { registryReset } from './actions'

/* Action Creators */
const resetRegistry = (): any => (
  async (dispatch: Function): Promise<Action> => (
    dispatch(registryReset())
  )
)

export { resetRegistry }

