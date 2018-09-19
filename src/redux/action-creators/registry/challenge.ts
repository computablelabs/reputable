// Dependencies
import Registry from 'computable/dist/contracts/registry'

// Local Dependencies
import { State, Challenge } from '../../../interfaces'
import { getRegistryContract } from '../../contracts'
import {
  registryChallengeRequest,
  registryChallengeOk,
  registryChallengeError,
  registryChallengeReset,
} from './actions'

/* Action Creators */
const fetchChallenge = (challengeID: string): any => (
  async (dispatch: Function, getState: Function): Promise<void> => {
    const state: State = getState()

    const args = { challengeID }
    dispatch(registryChallengeRequest(args))

    try {
      const registry: Registry = await getRegistryContract(state)
      const challenge: Challenge = await registry.challenges(challengeID) as Challenge

      const out = {
        challengeID,
        rewardPool: challenge.rewardPool,
        challenger: challenge.challenger,
        resolved: challenge.resolved,
        stake: challenge.stake,
        totalTokens: challenge.totalTokens,
        rewardsClaimed: challenge.rewardsClaimed,
      }

      dispatch(registryChallengeOk(out))
    } catch (err) {
      dispatch(registryChallengeError(err))
    }
  }
)

interface RegistryChallengeListingParams {
  listingHash: string
  userAddress: string
}
const challengeListing = ({ listingHash, userAddress }: RegistryChallengeListingParams): any => (
  async (dispatch: Function, getState: Function): Promise<void> => {
    const state: State = getState()

    const args = { listingHash, userAddress }
    dispatch(registryChallengeRequest(args))

    try {
      const registry: Registry = await getRegistryContract(state)
      await registry.challenge(listingHash, '', { from: userAddress })
    } catch (err) {
      dispatch(registryChallengeError(err))
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

