// Local Dependencies
import { Map, EventLog } from '../../../interfaces'
import store from '../../store'
import * as votingActions from '../../action-creators/voting'
import {
  votingRightsGrantedEventResponder,
  voteCommittedEventResponder,
} from './voting'

fdescribe('contract observer', () => {
  describe('voting responders', () => {
    describe('VotingRightGranted event responder', async () => {
      beforeAll(async function(this: Map) {
        // @ts-ignore:2239
        spyOn(votingActions, 'votingVoteOk').and.returnValue({ type: 'mock type' })

        this.returnValues = {
          numTokens: 125,
          voter:     'voter address',
        }

        this.responder = votingRightsGrantedEventResponder(store.dispatch, store.getState)
      })

      afterEach(() => {
        // @ts-ignore:2339
        votingActions.votingVoteOk.calls.reset()
      })

      it('dispatches the appropriate actions', async function(this: Map) {
        await this.responder({ returnValues: this.returnValues } as EventLog)

        // @ts-ignore:2239
        expect(votingActions.votingVoteOk.calls.count()).toEqual(1)

        // @ts-ignore:2239
        const args = votingActions.votingVoteOk.calls.first().args[0]
        expect(args.tokens).toEqual(this.returnValues.numTokens)
        expect(args.voter).toEqual(this.returnValues.voter)
      })
    })

    describe('VoteCommitted event responder', async () => {
      beforeAll(async function(this: Map) {
        // @ts-ignore:2239
        spyOn(votingActions, 'votingVoteOk').and.returnValue({ type: 'mock type' })

        this.returnValues = {
          pollID:    'challenge ID',
          numTokens: 125,
          voter:     'voter address',
        }

        this.responder = voteCommittedEventResponder(store.dispatch, store.getState)
      })

      afterEach(() => {
        // @ts-ignore:2339
        votingActions.votingVoteOk.calls.reset()
      })

      it('dispatches the appropriate actions', async function(this: Map) {
        await this.responder({ returnValues: this.returnValues } as EventLog)

        // @ts-ignore:2239
        expect(votingActions.votingVoteOk.calls.count()).toEqual(1)

        // @ts-ignore:2239
        const args = votingActions.votingVoteOk.calls.first().args[0]
        expect(args.challengeId).toEqual(this.returnValues.pollID)
        expect(args.tokens).toEqual(this.returnValues.numTokens)
        expect(args.voter).toEqual(this.returnValues.voter)
      })
    })
  })
})

