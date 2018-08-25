import store from '../store'
import { resetVotingAddress as resetAddress } from '../action-creators/voting'

const resetVoting = (): void => {
  store.dispatch(resetAddress())
}

export { resetVoting }

