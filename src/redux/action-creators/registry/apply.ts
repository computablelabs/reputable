import Registry from 'computable/dist/contracts/registry'
import {
  EventEmitter,
  EventLog,
  Map,
  State,
  Participant,
  Listing,
  ApplicantData,
} from '../../../interfaces'
import { DataSources, Errors } from '../../../constants'
import { getWeb3 } from '../../../initializers'
import { IPFSWrite, IPFSRead } from '../../../helpers/ipfs'
import { getWebsocketAddress, getOwner, getRegistryAddress } from '../../selectors'
import {
  registryListingRequest,
  registryListingOk,
  registryListingRemove,
  registryListingError,
  registryListingReset,

  registryApplyRequest,
  registryApplyOk,
  registryApplyError,

  registryChallengeOk,
} from './actions'

/* Action Creators */
const fetchListing = (listingHash: string): any => (
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

      const listing: Listing = await registry.listings(listingHash) as Listing

      const out = {
        listingHash,
        applicationExpiry: listing.applicationExpiry,
        whitelisted: listing.whitelisted,
        challenge: listing.challenge,
        owner: listing.owner,
        unstakedDeposit: listing.unstakedDeposit,
      }

      dispatch(registryListingOk(out))

      return out
    } catch (err) {
      dispatch(registryListingError(err))

      return undefined
    }
  }
)

interface RegistryApplyParams {
  listing: string
  userAddress: string
  deposit: number
  data?: ApplicantData
}
const applyListing = ({
  listing,
  userAddress,
  deposit,
  data,
}: RegistryApplyParams): any => (
  async (dispatch: Function, getState: Function): Promise<Map|undefined> => {
    const state: State = getState()

    const args = { listing, userAddress, deposit, data }
    dispatch(registryApplyRequest(args))

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

      const emitter: EventEmitter = registry.getEventEmitter('_Application') as EventEmitter
      emitter.on('data', async (log: EventLog) => {
        const eventValues = log.returnValues

        out = {
          listingHash: eventValues.listingHash,
          applicationExpiry: eventValues.appEndDate,
          whitelisted: false,
          owner: eventValues.applicant,
          unstakedDeposit: eventValues.deposit,
          data: await decodeData(eventValues.data),
        }

        dispatch(registryApplyOk(out))
      })

      const encodedListing: string = web3.utils.toHex(listing)
      const stringifiedData: string = await encodeData(data || { value: '' })

      await registry.apply(
        encodedListing,
        deposit,
        stringifiedData,
        { from: userAddress },
      )

      emitter.unsubscribe()

      return out
    } catch (err) {
      dispatch(registryApplyError(err))

      return undefined
    }
  }
)

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

const resetRegistryListings = (): any => (
  async (dispatch: Function): Promise<void> => {
    dispatch(registryListingReset())
  }
)

const encodeData = async (applicantData: ApplicantData): Promise<string> => {
  if (applicantData.source === DataSources.IPFS) {
    const cid: string = await IPFSWrite(applicantData.value)
    applicantData.value = cid
    return JSON.stringify(applicantData)
  }

  return JSON.stringify(applicantData)
}

const decodeData = async (data: string): Promise<ApplicantData> => {
  const parsedData: ApplicantData = JSON.parse(data)

  if (parsedData.source === DataSources.IPFS) {
    const cid: string = typeof parsedData.value === 'string' ?
      parsedData.value : ''
    const ipfsData: Map|string = await IPFSRead(cid)

    parsedData.value = ipfsData

    return parsedData
  }

  return parsedData
}

export {
  fetchListing,
  applyListing,
  updateListingStatus,
  resetRegistryListings,
}

