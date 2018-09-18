// Local Dependencies
import { Action } from '../../../interfaces'
import { tokenReset } from './actions'

/* Action Creators */
const resetToken = (): any => (
  async (dispatch: Function): Promise<Action> => (
    dispatch(tokenReset())
  )
)

export { resetToken }

