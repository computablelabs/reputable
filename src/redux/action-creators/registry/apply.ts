import { EventLog } from 'web3/types.d'
import Registry from 'computable/dist/contracts/registry'
import { onData } from 'computable/dist/helpers'
import {
  Action,
  FSA,
  Map,
  State,
  Participant,
} from '../../../interfaces'
import { Errors } from '../../../constants'
import { getWeb3 } from '../../../initializers'
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
  data?: string
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
      const owner: Participant = getOwner(state)
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
      registry.apply(encodedListing, deposit, data, { from: userAddress })

      const eventLog: EventLog = await onData(emitter)
      const eventValues = eventLog.returnValues

      const out = {
        listing: web3.utils.hexToUtf8(eventValues.listingHash),
        applicationExpiry: eventValues.appEndDate,
        owner: eventValues.applicant,
        unstakedDeposit: eventValues.deposit,
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

export { apply, resetRegistryApply }

