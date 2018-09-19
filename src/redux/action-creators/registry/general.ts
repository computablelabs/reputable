// Local Dependencies
import { registryReset } from './actions'

/* Action Creators */
const resetRegistry = (): any => (
  async (dispatch: Function): Promise<void> => {
    dispatch(registryReset())
  }
)

export { resetRegistry }

