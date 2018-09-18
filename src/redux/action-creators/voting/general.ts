// Local Dependencies
import { Action } from '../../../interfaces'
import { votingReset } from './actions'

/* Action Creators */
const resetVoting = (): any => (
  async (dispatch: Function): Promise<Action> => (
    dispatch(votingReset())
  )
)

export { resetVoting }

