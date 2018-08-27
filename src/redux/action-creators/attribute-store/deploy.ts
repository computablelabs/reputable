import { Contract } from 'web3/types.d'
import { deployAttributeStore as deploy } from 'computable/dist/helpers'
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
export const ATTRIBUTE_STORE_REQUEST = 'ATTRIBUTE_STORE_REQUEST'
export const ATTRIBUTE_STORE_OK = 'ATTRIBUTE_STORE_OK'
export const ATTRIBUTE_STORE_ERROR = 'ATTRIBUTE_STORE_ERROR'
export const ATTRIBUTE_STORE_RESET = 'ATTRIBUTE_STORE_RESET'

// Actions
const attributeStoreRequest = (value: Map): FSA => ({
  type: ATTRIBUTE_STORE_REQUEST,
  payload: value,
})

const attributeStoreOk = (value: Deployed): FSA => ({
  type: ATTRIBUTE_STORE_OK,
  payload: value,
})

const attributeStoreError = (value: Error): FSA => ({
  type: ATTRIBUTE_STORE_ERROR,
  payload: value,
})

const attributeStoreReset = (): FSA => ({
  type: ATTRIBUTE_STORE_RESET,
  payload: {},
})

// Action Creators
const deployAttributeStore = (): any => (
  async (dispatch: Function, getState: Function): Promise<string> => {
    const state: State = getState()

    const args = {}
    dispatch(attributeStoreRequest(args))

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

      dispatch(attributeStoreOk({ address: contractAddress }))

      return contractAddress
    } catch (err) {
      dispatch(attributeStoreError(err))

      return ''
    }
  }
)

const resetAttributeStore = (): any => (
  async (dispatch: Function): Promise<Action> => (
    dispatch(attributeStoreReset())
  )
)

export { deployAttributeStore, resetAttributeStore }

