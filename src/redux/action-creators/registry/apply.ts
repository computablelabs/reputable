import { EventLog } from 'web3/types.d'
import Registry from 'computable/dist/contracts/registry'
import { onData } from 'computable/dist/helpers'
import {
  Action,
  FSA,
  Map,
  State,
  Participant,
  ApplicantData,
} from '../../../interfaces'
import { DataSources, Errors } from '../../../constants'
import { getWeb3 } from '../../../initializers'
import { IPFSWrite, IPFSRead } from '../../../utils/ipfs'
import { getWebsocketAddress, getOwner, getRegistryAddress } from '../../selectors'

// Action Types
export const REGISTRY_APPLY_REQUEST = 'REGISTRY_APPLY_REQUEST'
export const REGISTRY_APPLY_OK = 'REGISTRY_APPLY_OK'
export const REGISTRY_APPLY_ERROR = 'REGISTRY_APPLY_ERROR'
export const REGISTRY_APPLY_RESET = 'REGISTRY_APPLY_RESET'

// Actions
const registryApplyRequest = (value: Map): FSA => ({
  type: REGISTRY_APPLY_REQUEST,
  payload: value,
})

// TODO restrict param type
const registryApplyOk = (value: Map): FSA => ({
  type: REGISTRY_APPLY_OK,
  payload: value,
})

const registryApplyError = (value: Error): FSA => ({
  type: REGISTRY_APPLY_ERROR,
  payload: value,
})

const registryApplyReset = (): FSA => ({
  type: REGISTRY_APPLY_RESET,
  payload: {},
})

// Action Creators
interface RegistryApplyParams {
  listing: string
  userAddress: string
  deposit: number
  data?: ApplicantData
}
const apply = ({
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
        listing: web3.utils.hexToUtf8(eventValues.listingHash),
        applicationExpiry: eventValues.appEndDate,
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

const resetRegistryApply = (): any => (
  async (dispatch: Function): Promise<Action> => (
    dispatch(registryApplyReset())
  )
)

const encodeData = async (applicantData: ApplicantData): Promise<string> => {
  if (applicantData.source === DataSources.IPFS) {
    const cid: string = await IPFSWrite(applicantData.value)
    applicantData.value = cid
    return JSON.stringify(applicantData)
  }

  return JSON.stringify(applicantData)
}

const decodeData = async (data: string): Promise<Map|string> => {
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

export { apply, resetRegistryApply }

