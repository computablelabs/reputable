// Local Dependencies
import { Action } from '../../../interfaces'
import { parameterizerReset } from './actions'

/* Action Creators */
const resetParameterizer = (): any => (
  async (dispatch: Function): Promise<Action> => (
    dispatch(parameterizerReset())
  )
)

export { resetParameterizer }

