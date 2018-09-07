import Registry from 'computable/dist/contracts/registry'
import {
  EventEmitter,
  EventLog,
  Map,
  State,
  Participant,
  Challenge,
  Listing,
} from '../../../interfaces'
import { Errors } from '../../../constants'
import { getWeb3 } from '../../../initializers'
import {
  getWebsocketAddress,
  getOwner,
  getRegistryAddress,
  getListing,
} from '../../selectors'
import {
  registryChallengeRequest,
  registryChallengeOk,
  registryChallengeError,
  registryChallengeReset,

  registryListingOk,
  // registryListingRemove,
} from './actions'

// Action Creators
const fetchChallenge = (challengeID: string): any => (
  async (dispatch: Function, getState: Function): Promise<Map|undefined> => {
    const state: State = getState()

    const args = { challengeID }
    dispatch(registryChallengeRequest(args))

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

      const contractAddress: string = getRegistryAddress(state)
      if (!contractAddress) {
        throw new Error(Errors.NO_REGISTRY_FOUND)
      }

      const registry = new Registry(owner.address)
      await registry.at(web3, { address: contractAddress })

      const challenge: Challenge = await registry.challenges(challengeID) as Challenge

      const out = {
        challengeID,
        rewardPool: challenge.rewardPool,
        // TODO (geoff) rename to `challenger`
        address: challenge.address,
        resolved: challenge.resolved,
        stake: challenge.stake,
        totalTokens: challenge.totalTokens,
        // TODO (geoff) rename to `rewardsClaimed`
        tokenClaims: challenge.tokenClaims,
      }

      dispatch(registryChallengeOk(out))

      return out
    } catch (err) {
      dispatch(registryChallengeError(err))

      return undefined
    }
  }
)

interface RegistryChallengeListingParams {
  listingHash: string
  userAddress: string
}
const challengeListing = ({ listingHash, userAddress }: RegistryChallengeListingParams): any => (
  async (dispatch: Function, getState: Function): Promise<Challenge|undefined> => {
    const state: State = getState()

    const args = { listingHash, userAddress }
    dispatch(registryChallengeRequest(args))

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

      const contractAddress: string = getRegistryAddress(state)
      if (!contractAddress) {
        throw new Error(Errors.NO_REGISTRY_FOUND)
      }

      const registry = new Registry(owner.address)
      await registry.at(web3, { address: contractAddress })

      let out: any = {}

      const emitterChallenge = registry.getEventEmitter('_Challenge') as EventEmitter
      emitterChallenge.on('data', (log: EventLog) => {
        const eventValues = log.returnValues

        // add challenge to global state
        out = {
          listingHash: eventValues.listingHash,
          challengeID: eventValues.challengeID,
          address: eventValues.challenger,
          // TODO (geoff) rename to `commitExpiry`
          commitEndDate: eventValues.commitEndDate,
          // TODO (geoff) rename to `revealExpiry`
          revealEndDate: eventValues.revealEndDate,
        }
        dispatch(registryChallengeOk(out))

        // update listing metadata
        const listing: Listing|undefined = getListing(state, eventValues.listingHash)
        if (listing) {
          listing.challengeID = eventValues.challengeID

          dispatch(registryListingOk(listing))
        }
      })

      /* TODO (geoff) implement + specs
      const emitterRemove = registry.getEventEmitter('_TouchAndRemoved') as EventEmitter
      emitterRemove.on('data', (log: EventLog) => {
        const eventValues = log.returnValues

        out = {
          listingHash: eventValues.listingHash,
        }

        dispatch(registryListingRemove(out))
      })
      */

      await registry.challenge(listingHash, '', { from: userAddress })

      emitterChallenge.unsubscribe()
      // emitterRemove.unsubscribe()

      return out
    } catch (err) {
      dispatch(registryChallengeError(err))

      return undefined
    }
  }
)

const resetRegistryChallenges = (): any => (
  async (dispatch: Function): Promise<void> => {
    dispatch(registryChallengeReset())
  }
)

export {
  fetchChallenge,
  challengeListing,
  resetRegistryChallenges,
}

