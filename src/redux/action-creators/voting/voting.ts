// Dependencies
import Voting from 'computable/dist/contracts/plcr-voting'
import { TransactionReceipt } from 'web3/types'

// Local Dependencies
import { State } from '../../../interfaces'
import { getVotingContract } from '../../contracts'
import { Errors } from '../../../constants'
import { getWeb3 } from '../../../initializers'
import { getWebsocketAddress } from '../../selectors'
import {
  votingVoteRequest,
  votingVoteError,
} from './actions'

/* Action Creators */
interface RequestVotingRightsParams {
  tokens: number
  userAddress: string
}
const requestVotingRights = ({ tokens, userAddress}: RequestVotingRightsParams): any => (
  async (dispatch: Function, getState: Function): Promise<TransactionReceipt|void> => {
    const state:State = getState()

    const args = {}
    dispatch(votingVoteRequest(args))

    try {
      const contract: Voting = await getVotingContract(state)

      const tx: TransactionReceipt = await contract.requestVotingRights(tokens, {
        from: userAddress,
      })

      return tx
    } catch (err) {
      dispatch(votingVoteError(err))
    }
  }
)

interface CommitVoteParams {
  challengeID: string
  voterAddress: string
  vote: number
  tokens: number
  salt: string
}
const commitVote = ({
  challengeID,
  voterAddress,
  vote,
  tokens,
  salt,
}: CommitVoteParams): any => (
  async (dispatch: Function, getState: Function): Promise<TransactionReceipt|void> => {
    const state: State = getState()

    const args = { challengeID, voterAddress, vote, tokens }
    dispatch(votingVoteRequest(args))

    try {
      const websocketAddress: string = getWebsocketAddress(state)
      if (!websocketAddress) {
        throw new Error(Errors.NO_WEBSOCKETADDRESS_FOUND)
      }

      const web3 = await getWeb3(websocketAddress)
      const contract: Voting = await getVotingContract(state)

      const tx: TransactionReceipt = await contract.commitVote(
        web3,
        challengeID,
        voterAddress,
        vote,
        tokens,
        salt,
      )

      return tx
    } catch (err) {
      dispatch(votingVoteError(err))
    }
  }
)

export { requestVotingRights, commitVote }

