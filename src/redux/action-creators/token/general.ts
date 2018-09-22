// Local Dependencies
import { tokenReset } from './actions'

/* Action Creators */
const resetToken = (): any => (
  async (dispatch: Function): Promise<void> => {
    dispatch(tokenReset())
  }
)

export { resetToken }

