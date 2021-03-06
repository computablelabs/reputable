// Local Dependencies
import {
  votingAddressOk,
  votingAddressReset,
} from './actions'

/* Action Creators */
const setVotingAddress = (votingAddress: string): any => (
  async (dispatch: Function): Promise<void> => (
    dispatch(votingAddressOk({ address: votingAddress }))
  )
)

const resetVotingAddress = (): any => (
  async (dispatch: Function): Promise<void> => (
    dispatch(votingAddressReset())
  )
)

export { setVotingAddress, resetVotingAddress }

