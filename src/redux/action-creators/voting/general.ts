// Local Dependencies
import { votingReset } from './actions'

/* Action Creators */
const resetVoting = (): any => (
  async (dispatch: Function): Promise<void> => (
    dispatch(votingReset())
  )
)

export { resetVoting }

