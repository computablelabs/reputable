// Dependencies
import Registry from 'computable/dist/contracts/registry'

// Local Dependencies
import {
  EventEmitter,
  EventLog,
  Map,
  State,
  Participant,
} from '../../../interfaces'
import { Errors } from '../../../constants'
import { getWeb3 } from '../../../initializers'
import { getWebsocketAddress, getOwner, getRegistryAddress } from '../../selectors'
import {
  registryListingRequest,
  registryListingOk,
  registryListingRemove,
  registryListingError,

  registryChallengeOk,
} from './actions'

/* Action Creators */
const updateListingStatus = (listingHash: string): any => (
  async (dispatch: Function, getState: Function): Promise<Map|undefined> => {
    const state: State = getState()

    const args = { listingHash }
    dispatch(registryListingRequest(args))

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

      let out = {}

      const emitterWhitelisted = registry.getEventEmitter('_ApplicationWhitelisted') as EventEmitter
      emitterWhitelisted.on('data', (log: EventLog) => {
        const eventValues = log.returnValues

        out = {
          listingHash: eventValues.listingHash,
          whitelisted: true,
        }

        dispatch(registryListingOk(out))
      })

      const emitterChallengeFailed = registry.getEventEmitter('_ChallengeFailed') as EventEmitter
      emitterChallengeFailed.on('data', (log: EventLog) => {
        const eventValues = log.returnValues

        out = {
          listingHash: eventValues.listingHash,
          challengeID: eventValues.id,
          rewardPool: eventValues.rewardPool,
          totalTokens: eventValues.totalTokens,
        }

        dispatch(registryChallengeOk(out))
      })

      const emitterChallengeSucceeded = registry.getEventEmitter('_ChallengeSucceeded') as EventEmitter
      emitterChallengeSucceeded.on('data', (log: EventLog) => {
        const eventValues = log.returnValues

        out = {
          listingHash: eventValues.listingHash,
          challengeID: eventValues.id,
          rewardPool: eventValues.rewardPool,
          totalTokens: eventValues.totalTokens,
        }

        dispatch(registryChallengeOk(out))
        dispatch(registryListingRemove(eventValues.listingHash))
      })

      await registry.updateStatus(listingHash)

      emitterWhitelisted.unsubscribe()
      emitterChallengeFailed.unsubscribe()
      emitterChallengeSucceeded.unsubscribe()

      return out
    } catch (err) {
      dispatch(registryListingError(err))

      return undefined
    }
  }
)

export { updateListingStatus }

