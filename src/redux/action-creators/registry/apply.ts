import Web3 from 'web3'
import { EventLog } from 'web3/types.d'
import Registry from 'computable/dist/contracts/registry'
import { onData } from 'computable/dist/helpers'
import {
  Action,
  FSA,
  State,
  Participant,
} from '../../../interfaces'
import { getOwner, getRegistryAddress } from '../../selectors'

// Action Types
export const REGISTRY_APPLY_REQUEST = 'REGISTRY_APPLY_REQUEST'
export const REGISTRY_APPLY_OK = 'REGISTRY_APPLY_OK'
export const REGISTRY_APPLY_ERROR = 'REGISTRY_APPLY_ERROR'
export const REGISTRY_APPLY_RESET = 'REGISTRY_APPLY_RESET'

// Actions
const registryApplyRequest = (value: { [key: string]: any }) => ({
  type: REGISTRY_APPLY_REQUEST,
  payload: value,
})

const registryApplyOk = (value: { [key: string]: any }): FSA => ({
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
const apply = (
  registryAddress: string,
  listing: string,
  userAddress: string,
  deposit: number | string,
  data?: string
): any =>
  async (dispatch: Function, getState: Function): Promise<{ [key: string]: string } | undefined> => {
    const state: State = getState()
    const owner: Participant = getOwner(state)
    const registryAddress: string = getRegistryAddress(state)

    const websocketAddress: string = state.websocketAddress || ''
    const web3Provider = new Web3.providers.WebsocketProvider(websocketAddress)
    const web3 = new Web3(web3Provider)
    const registry = new Registry(owner.address)

    registryAddress && await registry.at(web3, { address: registryAddress })

    const encodedListing: string = web3.utils.toHex(listing)

    const args = { registryAddress, listing, userAddress, deposit, data }

    // dispatch that a request has been initialized
    dispatch(registryApplyRequest(args))

    try {
      const emitter = registry.getEventEmitter('_Application')

      registry.apply(encodedListing, deposit, data, { from: userAddress })

      const eventLog: EventLog = await onData(emitter)
      const eventValues = eventLog.returnValues

      const out = {
        applicant: eventValues.applicant,
        deposit: eventValues.deposit,
        appEndDate: eventValues.appEndDate,
        listing: web3.utils.hexToUtf8(eventValues.listingHash),
      }

      dispatch(registryApplyOk(out))

      return out
    } catch (err) {
      dispatch(registryApplyError(err))

      return undefined
    }
  }

const resetRegistryApply = (): Action => registryApplyReset()

export { apply, resetRegistryApply }

