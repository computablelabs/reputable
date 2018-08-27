import { Contract } from 'web3/types.d'
import { deployDll as deploy } from 'computable/dist/helpers'
import {
  Action,
  FSA,
  State,
  Map,
  Deployed,
  Participant,
} from '../../../interfaces'
import { Errors } from '../../../constants'
import { getWebsocketAddress, getOwner } from '../../selectors'
import { getWeb3 } from '../../../initializers'

// Action Types
export const DLL_REQUEST = 'DLL_REQUEST'
export const DLL_OK = 'DLL_OK'
export const DLL_ERROR = 'DLL_ERROR'
export const DLL_RESET = 'DLL_RESET'

// Actions
const dllRequest = (value: Map): FSA => ({
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
const deployDll = (): any =>
  async (dispatch: Function, getState: Function): Promise<string> => {
    const state: State = getState()

    const args = {}
    dispatch(dllRequest(args))

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

      const contract: Contract = await deploy(web3, owner.address)

      // any raw web3.eth.Contract will have its address at
      // contract.options.address
      const contractAddress: string = contract.options.address

      dispatch(dllOk({ address: contractAddress }))

      return contractAddress
    } catch(err) {
      dispatch(dllError(err))

      return ''
    }
  }

const resetDll = (): any => (
  async (dispatch: Function): Promise<Action> => (
    dispatch(dllReset())
  )
)

export { deployDll, resetDll }

