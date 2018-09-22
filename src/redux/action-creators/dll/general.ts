// Local Dependencies
import { dllReset } from './actions'

/* Action Creators */
const resetDll = (): any => (
  async (dispatch: Function): Promise<void> => (
    dispatch(dllReset())
  )
)

export { resetDll }

