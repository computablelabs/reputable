import Web3 from 'web3'
import { Contract } from 'web3/types.d'
import { deployDll as deploy } from 'computable/dist/helpers'
import {
  Action,
  FSA,
  State,
  Deployed,
  Participant,
} from '../../interfaces'
import { Errors } from '../../constants'
import { getOwner } from '../selectors'

// Action Types
export const DLL_REQUEST = 'DLL_REQUEST'
export const DLL_OK = 'DLL_OK'
export const DLL_ERROR = 'DLL_ERROR'
export const DLL_RESET = 'DLL_RESET'

// Actions
const dllRequest = (value: Deployed): FSA => ({
  type: DLL_REQUEST,
  payload: value,
})

const dllOk = (value: Deployed): FSA => ({
  type: DLL_OK,
  payload: value,
})

const dllError = (value: Error): FSA => ({
  type: DLL_ERROR,
  payload: value,
})

const dllReset = (): FSA => ({
  type: DLL_RESET,
  payload: {},
})

// Action Creators

/**
 * It is debateable how useful the full range of actions are for deploying the two
 * voting contract dependencies (dll, attrStore). That being said, I'm just being consistent so...
 *
 * Note that there is no Higher Order Contract for them, but a helper for each
 */

const deployDll = (address: string = ''): any =>
  async (dispatch: Function, getState: Function): Promise<string> => {
    const state: State = getState()
    const owner: Participant | undefined = getOwner(state)
    const { websocketAddress } = state

    dispatch(dllRequest({ address }))

    if (!websocketAddress) {
      dispatch(dllError(new Error(Errors.NO_WEBSOCKETADDRESS_FOUND)))
      return ''
    }

    if (!owner) {
      dispatch(dllError(new Error(Errors.NO_ADMIN_FOUND)))
      return ''
    }

    const web3Provider = new Web3.providers.WebsocketProvider(websocketAddress)
    const web3 = new Web3(web3Provider)

    try {
      // note that the computable deploy helpers return the actual contract
      const dll: Contract = await deploy(web3, address || owner.address)

      // any raw web3.eth.Contract will have its address @ contract.options.address
      const dllAddress: string = dll.options.address

      dispatch(dllOk({ address: dllAddress }))
      return dllAddress
    } catch(err) {
      dispatch(dllError(err))
      return ''
    }
  }

const resetDll = (): Action => dllReset()

export { deployDll, resetDll }

