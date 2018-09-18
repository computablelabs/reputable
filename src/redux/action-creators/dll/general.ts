// Local Dependencies
import { Action } from '../../../interfaces'
import { dllReset } from './actions'

/* Action Creators */
const resetDll = (): any => (
  async (dispatch: Function): Promise<Action> => (
    dispatch(dllReset())
  )
)

export { resetDll }

