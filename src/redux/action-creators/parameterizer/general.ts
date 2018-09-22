// Local Dependencies
import { parameterizerReset } from './actions'

/* Action Creators */
const resetParameterizer = (): any => (
  async (dispatch: Function): Promise<void> => (
    dispatch(parameterizerReset())
  )
)

export { resetParameterizer }

