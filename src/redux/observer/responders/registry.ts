// Local Dependencies
import { Map, EventLog, State, Listing } from '../../../interfaces'
import { decodeData } from '../../../helpers/data'
import {
  registryApplyOk,
  registryListingOk,
  registryListingRemove,
  registryChallengeOk,
} from '../../action-creators/registry'
import { getListing } from '../../selectors'

const applicationEventResponder = (dispatch: Function, getState: Function) => (
  async (log: EventLog) => {
    const eventValues: Map = log.returnValues

    const out: any = {
      listingHash:       eventValues.listingHash,
      applicationExpiry: eventValues.appEndDate,
      whitelisted:       false,
      owner:             eventValues.applicant,
      unstakedDeposit:   eventValues.deposit,
      data:              await decodeData(eventValues.data),
    }

    dispatch(registryApplyOk(out))
  }
)

const applicationWhitelistedEventResponder = (dispatch: Function, getState: Function) => (
  async (log: EventLog) => {
    const eventValues: Map = log.returnValues

    const out: any = {
      listingHash: eventValues.listingHash,
      whitelisted: true,
    }

    dispatch(registryListingOk(out))
  }
)

const challengeEventResponder = (dispatch: Function, getState: Function) => (
  async (log: EventLog) => {
    const state: State = getState()
    const eventValues: Map = log.returnValues

    // add challenge to global state
    const out: any = {
      listingHash:  eventValues.listingHash,
      id:           eventValues.id,
      challenger:   eventValues.challenger,
      commitExpiry: eventValues.commitExpiry,
      revealExpiry: eventValues.revealExpiry,
    }

    dispatch(registryChallengeOk(out))

    // update listing metadata
    const listing: Listing|undefined = getListing(state, eventValues.listingHash)

    if (listing) {
      listing.challenge = eventValues.id

      dispatch(registryListingOk(listing))
    }
  }
)

const challengeSucceededEventResponder = (dispatch: Function, getState: Function) => (
  async (log: EventLog) => {
    const eventValues: Map = log.returnValues

    const out: any = {
      listingHash: eventValues.listingHash,
      challengeID: eventValues.id,
      rewardPool:  eventValues.rewardPool,
      totalTokens: eventValues.totalTokens,
    }

    dispatch(registryChallengeOk(out))
    dispatch(registryListingRemove(eventValues.listingHash))
  }
)

const challengeFailedEventResponder = (dispatch: Function, getState: Function) => (
  async (log: EventLog) => {
    const eventValues: Map = log.returnValues

    const out: any = {
      listingHash: eventValues.listingHash,
      challengeID: eventValues.id,
      rewardPool:  eventValues.rewardPool,
      totalTokens: eventValues.totalTokens,
    }

    dispatch(registryChallengeOk(out))
  }
)

export {
  applicationEventResponder,
  applicationWhitelistedEventResponder,
  challengeEventResponder,
  challengeSucceededEventResponder,
  challengeFailedEventResponder,
}

