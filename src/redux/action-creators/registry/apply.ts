import { EventLog } from 'web3/types.d'
import Registry from 'computable/dist/contracts/registry'
import { onData } from 'computable/dist/helpers'
import {
  FSA,
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

// Action Types
export const REGISTRY_LISTING_REQUEST = 'REGISTRY_LISTING_REQUEST'
export const REGISTRY_LISTING_OK = 'REGISTRY_LISTING_OK'
export const REGISTRY_LISTING_REMOVE = 'REGISTRY_LISTING_REMOVE'
export const REGISTRY_LISTING_ERROR = 'REGISTRY_LISTING_ERROR'
export const REGISTRY_LISTING_RESET = 'REGISTRY_LISTING_RESET'

export const REGISTRY_APPLY_REQUEST = 'REGISTRY_APPLY_REQUEST'
export const REGISTRY_APPLY_OK = 'REGISTRY_APPLY_OK'
export const REGISTRY_APPLY_ERROR = 'REGISTRY_APPLY_ERROR'

// Actions
const registryListingRequest = (value: Map): FSA => ({
  type: REGISTRY_LISTING_REQUEST,
  payload: value,
})

const registryListingOk = (value: Map): FSA => ({
  type: REGISTRY_LISTING_OK,
  payload: value,
})

/*
const registryListingRemove = (value: string): FSA => ({
  type: REGISTRY_LISTING_REMOVE,
  payload: value,
})
*/

const registryListingError = (value: Error): FSA => ({
  type: REGISTRY_LISTING_ERROR,
  payload: value,
})

const registryListingReset = (): FSA => ({
  type: REGISTRY_LISTING_RESET,
  payload: {},
})

const registryApplyRequest = (value: Map): FSA => ({
  type: REGISTRY_APPLY_REQUEST,
  payload: value,
})

const registryApplyOk = (value: Listing): FSA => ({
  type: REGISTRY_APPLY_OK,
  payload: value,
})

const registryApplyError = (value: Error): FSA => ({
  type: REGISTRY_APPLY_ERROR,
  payload: value,
})

// Action Creators
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

      const listing: any = await registry.listings(listingHash)

      const out = {
        listingHash,
        applicationExpiry: listing.applicationExpiry,
        whitelisted: listing.whitelisted,
        // TODO (geoff) having a challenge ID does not mean a challenge is active
        challengeID: listing.challengeID,
        owner: listing.owner,
        unstakedDeposit: listing.unstakedDeposit,
        // TODO (geoff) `data` is not returned
        // data: await decodeData(listing.data),
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

      const emitter = registry.getEventEmitter('_Application')

      const encodedListing: string = web3.utils.toHex(listing)

      const stringifiedData: string = await encodeData(data || { value: '' })

      registry.apply(
        encodedListing,
        deposit,
        stringifiedData,
        { from: userAddress },
      )

      const eventLog: EventLog = await onData(emitter)
      const eventValues = eventLog.returnValues

      const out = {
        listingHash: eventValues.listingHash,
        applicationExpiry: eventValues.appEndDate,
        whitelisted: false,
        owner: eventValues.applicant,
        unstakedDeposit: eventValues.deposit,
        data: await decodeData(eventValues.data),
      }

      dispatch(registryApplyOk(out))

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

      const emitterWhitelisted = registry.getEventEmitter('_ApplicationWhitelisted')
      emitterWhitelisted.on('data', (log: EventLog) => {
        const eventValues = log.returnValues

        out = {
          listingHash: eventValues.listingHash,
          whitelisted: true,
        }
      })

      // TODO (geoff) subscribe to challenge events
      // const emitterChallengeSucceeded = registry.getEventEmitter('_ChallengeSucceeded')
      // const emitterChallengeFailed = registry.getEventEmitter('_ChallengeFailed')

      await registry.updateStatus(listingHash)

      dispatch(registryListingOk(out))

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

