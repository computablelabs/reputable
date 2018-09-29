// Local Dependencies
import { Map, EventLog } from '../../../interfaces'
import store from '../../store'
import { encodeData } from '../../../helpers/data'
import * as registryActions from '../../action-creators/registry'
import * as selectors from '../../selectors'
import {
  applicationEventResponder,
  applicationWhitelistedEventResponder,
  challengeEventResponder,
  challengeSucceededEventResponder,
  challengeFailedEventResponder,
} from './registry'

describe('contract observer', () => {
  describe('registry responders', () => {
    describe('Application event responder', async () => {
      beforeAll(async function(this: Map) {
        // @ts-ignore:2239
        spyOn(registryActions, 'registryApplyOk').and.returnValue({ type: 'mock type' })

        this.data = { value: 'data value' }

        this.returnValues = {
          listingHash: 'listing hash',
          appEndDate:  Date.now(),
          applicant:   'applicant address',
          deposit:     100,
          data:        await encodeData(this.data),
        }

        this.responder = applicationEventResponder(store.dispatch, store.getState)
      })

      afterEach(() => {
        // @ts-ignore:2339
        registryActions.registryApplyOk.calls.reset()
      })

      it('dispatches the appropriate actions', async function(this: Map) {
        await this.responder({ returnValues: this.returnValues } as EventLog)

        // @ts-ignore:2339
        expect(registryActions.registryApplyOk.calls.count()).toEqual(1)

        // @ts-ignore:2239
        const args = registryActions.registryApplyOk.calls.first().args[0]
        expect(args.listingHash).toEqual(this.returnValues.listingHash)
        expect(args.applicationExpiry).toEqual(this.returnValues.appEndDate)
        expect(args.whitelisted).toEqual(false)
        expect(args.owner).toEqual(this.returnValues.applicant)
        expect(args.unstakedDeposit).toEqual(this.returnValues.deposit)
        expect(args.data).toEqual(this.data)
      })
    })

    describe('ApplicationWhitelisted event responder', async () => {
      beforeAll(async function(this: Map) {
        // @ts-ignore:2239
        spyOn(registryActions, 'registryListingOk').and.returnValue({ type: 'mock type' })

        this.returnValues = {
          listingHash: 'listing hash',
        }

        this.responder = applicationWhitelistedEventResponder(store.dispatch, store.getState)
      })

      afterEach(() => {
        // @ts-ignore:2339
        registryActions.registryListingOk.calls.reset()
      })

      it('dispatches the appropriate actions', async function(this: Map) {
        await this.responder({ returnValues: this.returnValues } as EventLog)

        // @ts-ignore:2339
        expect(registryActions.registryListingOk.calls.count()).toEqual(1)

        // @ts-ignore:2239
        const args = registryActions.registryListingOk.calls.first().args[0]
        expect(args.listingHash).toEqual(this.returnValues.listingHash)
        expect(args.whitelisted).toEqual(true)
      })
    })

    describe('Challenge event responder', async () => {
      beforeAll(async function(this: Map) {
        // @ts-ignore:2239
        spyOn(registryActions, 'registryChallengeOk').and.returnValue({ type: 'mock type' })
        spyOn(registryActions, 'registryListingOk').and.returnValue({ type: 'mock type' })
        spyOn(selectors, 'getListing').and.returnValue({})

        this.returnValues = {
          listingHash:  'listing hash',
          id:           'challenge id',
          challenger:   'challenger address',
          commitExpiry: Date.now(),
          revealExpiry: Date.now() + 100,
        }

        this.responder = challengeEventResponder(store.dispatch, store.getState)
      })

      afterEach(() => {
        // @ts-ignore:2339
        registryActions.registryChallengeOk.calls.reset()

        // @ts-ignore:2339
        registryActions.registryListingOk.calls.reset()

        // @ts-ignore:2339
        selectors.getListing.calls.reset()
      })

      it('dispatches the appropriate actions', async function(this: Map) {
        await this.responder({ returnValues: this.returnValues } as EventLog)

        // @ts-ignore:2339
        expect(registryActions.registryChallengeOk.calls.count()).toEqual(1)

        // @ts-ignore:2239
        const challengeArgs = registryActions.registryChallengeOk.calls.first().args[0]
        expect(challengeArgs.listingHash).toEqual(this.returnValues.listingHash)
        expect(challengeArgs.id).toEqual(this.returnValues.id)
        expect(challengeArgs.challenger).toEqual(this.returnValues.challenger)
        expect(challengeArgs.commitExpiry).toEqual(this.returnValues.commitExpiry)
        expect(challengeArgs.revealExpiry).toEqual(this.returnValues.revealExpiry)

        // @ts-ignore:2339
        expect(registryActions.registryListingOk.calls.count()).toEqual(1)

        // @ts-ignore:2239
        const listingArgs = registryActions.registryListingOk.calls.first().args[0]
        expect(listingArgs.challenge).toEqual(this.returnValues.id)
      })
    })

    describe('ChallengeSucceeded event responder', async () => {
      beforeAll(async function(this: Map) {
        // @ts-ignore:2239
        spyOn(registryActions, 'registryChallengeOk').and.returnValue({ type: 'mock type' })
        spyOn(registryActions, 'registryListingRemove').and.returnValue({ type: 'mock type' })

        this.returnValues = {
          listingHash: 'listing hash',
          id:          'challenge id',
          rewardPool:  100,
          totalTokens: 200,
        }

        this.responder = challengeSucceededEventResponder(store.dispatch, store.getState)
      })

      afterEach(() => {
        // @ts-ignore:2339
        registryActions.registryChallengeOk.calls.reset()

        // @ts-ignore:2339
        registryActions.registryListingRemove.calls.reset()
      })

      it('dispatches the appropriate actions', async function(this: Map) {
        await this.responder({ returnValues: this.returnValues } as EventLog)

        // @ts-ignore:2339
        expect(registryActions.registryChallengeOk.calls.count()).toEqual(1)

        // @ts-ignore:2239
        const challengeArgs = registryActions.registryChallengeOk.calls.first().args[0]
        expect(challengeArgs.listingHash).toEqual(this.returnValues.listingHash)
        expect(challengeArgs.challengeID).toEqual(this.returnValues.id)
        expect(challengeArgs.rewardPool).toEqual(this.returnValues.rewardPool)
        expect(challengeArgs.totalTokens).toEqual(this.returnValues.totalTokens)

        // @ts-ignore:2339
        expect(registryActions.registryListingRemove.calls.count()).toEqual(1)

        // @ts-ignore:2239
        const listingArgs = registryActions.registryListingRemove.calls.first().args[0]
        expect(listingArgs).toEqual(this.returnValues.listingHash)
      })
    })

    describe('ChallengeFailed event responder', async () => {
      beforeAll(async function(this: Map) {
        // @ts-ignore:2239
        spyOn(registryActions, 'registryChallengeOk').and.returnValue({ type: 'mock type' })

        this.returnValues = {
          listingHash: 'listing hash',
          id:          'challenge id',
          rewardPool:  100,
          totalTokens: 200,
        }

        this.responder = challengeFailedEventResponder(store.dispatch, store.getState)
      })

      afterEach(() => {
        // @ts-ignore:2339
        registryActions.registryChallengeOk.calls.reset()
      })

      it('dispatches the appropriate actions', async function(this: Map) {
        await this.responder({ returnValues: this.returnValues } as EventLog)

        // @ts-ignore:2339
        expect(registryActions.registryChallengeOk.calls.count()).toEqual(1)

        // @ts-ignore:2239
        const challengeArgs = registryActions.registryChallengeOk.calls.first().args[0]
        expect(challengeArgs.listingHash).toEqual(this.returnValues.listingHash)
        expect(challengeArgs.challengeID).toEqual(this.returnValues.id)
        expect(challengeArgs.rewardPool).toEqual(this.returnValues.rewardPool)
        expect(challengeArgs.totalTokens).toEqual(this.returnValues.totalTokens)
      })
    })
  })
})

