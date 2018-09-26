// Local Dependencies
import { Map, EventLog } from '../../../interfaces'
import {
  votingVoteOk,
} from '../../action-creators/voting'

const votingRightsGrantedEventResponder = (dispatch: Function, getState: Function) => (
  async (log: EventLog): Promise<void> => {
    const eventValues: Map = log.returnValues

    const out: any = {
      tokens: eventValues.numTokens,
      voter:  eventValues.voter,
    }

    dispatch(votingVoteOk(out))
  }
)

const voteCommittedEventResponder = (dispatch: Function, getState: Function) => (
  async (log: EventLog): Promise<void> => {
    const eventValues: Map = log.returnValues

    const out: any = {
      challengeId: eventValues.pollID,
      tokens:      eventValues.numTokens,
      voter:       eventValues.voter,
    }

    dispatch(votingVoteOk(out))
  }
)

export {
  votingRightsGrantedEventResponder,
  voteCommittedEventResponder,
}

