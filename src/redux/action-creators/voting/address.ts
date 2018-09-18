// Local Dependencies
import { Action } from '../../../interfaces'
import {
  votingAddressOk,
  votingAddressReset,
} from './actions'

/* Action Creators */
const setVotingAddress = (votingAddress: string): any => (
  async (dispatch: Function): Promise<Action> => (
    dispatch(votingAddressOk({ address: votingAddress }))
  )
)

const resetVotingAddress = (): any => (
  async (dispatch: Function): Promise<Action> => (
    dispatch(votingAddressReset())
  )
)

export { setVotingAddress, resetVotingAddress }

