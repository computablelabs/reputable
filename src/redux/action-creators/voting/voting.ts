// Dependencies
import Voting from 'computable/dist/contracts/plcr-voting'

// Local Dependencies
import {
  EventEmitter,
  EventLog,
  State,
  Participant,
} from '../../../interfaces'
import { Errors } from '../../../constants'
import { getWeb3 } from '../../../initializers'
import {
  getWebsocketAddress,
  getOwner,
  getVotingAddress,
} from '../../selectors'
import {
  votingVoteRequest,
  votingVoteOk,
  votingVoteError,
} from './actions'

/* Action Creators */
interface RequestVotingRightsParams {
  tokens: number
  userAddress: string
}
const requestVotingRights = ({ tokens, userAddress}: RequestVotingRightsParams): any => (
  async (dispatch: Function, getState: Function): Promise<void> => {
    const state:State = getState()

    const args = {}
    dispatch(votingVoteRequest(args))

    try {
      const owner: Participant|undefined = getOwner(state)
      if (!owner) {
        throw new Error(Errors.NO_ADMIN_FOUND)
      }

      const websocketAddress: string = getWebsocketAddress(state)
      if (!websocketAddress) {
        throw new Error(Errors.NO_WEBSOCKETADDRESS_FOUND)
      }

      const web3 = await getWeb3(websocketAddress)

      const contractAddress: string = getVotingAddress(state)
      if (!contractAddress) {
        throw new Error(Errors.NO_VOTING_FOUND)
      }

      const contract = new Voting(owner.address)
      await contract.at(web3, { address: contractAddress })

      let out: any = {}

      const emitter = contract.getEventEmitter('') as EventEmitter
      emitter.on('data', (log: EventLog) => {
        const eventValues = log.returnValues

        out = {
          tokens: eventValues.numTokens,
          voter: eventValues.voter,
        }

        dispatch(votingVoteOk(out))
      })

      await contract.requestVotingRights(tokens, {
        from: userAddress,
      })

      emitter.unsubscribe()
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
  async (dispatch: Function, getState: Function): Promise<void> => {
    const state: State = getState()

    const args = { challengeID, voterAddress, vote, tokens }
    dispatch(votingVoteRequest(args))

    try {
      const owner: Participant|undefined = getOwner(state)
      if (!owner) {
        throw new Error(Errors.NO_ADMIN_FOUND)
      }

      const websocketAddress: string = getWebsocketAddress(state)
      if (!websocketAddress) {
        throw new Error(Errors.NO_WEBSOCKETADDRESS_FOUND)
      }

      const web3 = await getWeb3(websocketAddress)

      const contractAddress: string = getVotingAddress(state)
      if (!contractAddress) {
        throw new Error(Errors.NO_VOTING_FOUND)
      }

      const contract = new Voting(owner.address)
      await contract.at(web3, { address: contractAddress })

      let out: any = {}

      const emitter = contract.getEventEmitter('_VoteCommitted') as EventEmitter
      emitter.on('data', (log: EventLog) => {
        const eventValues = log.returnValues

        out = {
          challengeId: eventValues.pollID,
          tokens: eventValues.numTokens,
          voter: eventValues.voter,
        }

        dispatch(votingVoteOk(out))
      })

      await contract.commitVote(
        web3,
        challengeID,
        voterAddress,
        vote,
        tokens,
        salt,
      )
    } catch (err) {
      dispatch(votingVoteError(err))
    }
  }
)

export { requestVotingRights, commitVote }

