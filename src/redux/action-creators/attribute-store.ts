import { Contract } from 'web3/types.d'
import { deployAttributeStore as deploy } from 'computable/dist/helpers'
import {
  Action,
  FSA,
  State,
  Deployed,
  Participant,
} from '../../interfaces'
import { Errors } from '../../constants'
import { getOwner } from '../selectors'
import { getWeb3 } from '../../helpers'

// Action Types
export const ATTRIBUTE_STORE_REQUEST = 'ATTRIBUTE_STORE_REQUEST'
export const ATTRIBUTE_STORE_OK = 'ATTRIBUTE_STORE_OK'
export const ATTRIBUTE_STORE_ERROR = 'ATTRIBUTE_STORE_ERROR'
export const ATTRIBUTE_STORE_RESET = 'ATTRIBUTE_STORE_RESET'

// Actions
const attributeStoreRequest = (value: Deployed): FSA => ({
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

/**
 * It is debateable how useful the full range of actions are for deploying the two
 * voting contract dependencies (dll, attrStore). That being said, I'm just being consistent so...
 *
 * Note that there is no Higher Order Contract for them, but a helper for each
 */

const deployAttributeStore = (address: string = ''): any =>
  async (dispatch: Function, getState: Function): Promise<string> => {
    const state: State = getState()
    const owner: Participant | undefined = getOwner(state)

    dispatch(attributeStoreRequest({ address }))

    let web3

    try {
      web3 = await getWeb3()
    } catch (err) {
      dispatch(attributeStoreError(err))
      return ''
    }

    if (!owner) {
      const error = new Error(Errors.NO_ADMIN_FOUND)
      dispatch(attributeStoreError(error))
      return ''
    }

    try {
      // note that the computable deploy helpers return the actual contract
      const store: Contract = await deploy(web3, address || owner.address)

      // any raw web3.eth.Contract will have its address @ contract.options.address
      const storeAddress: string = store.options.address

      dispatch(attributeStoreOk({ address: storeAddress }))
      return storeAddress
    } catch(err) {
      dispatch(attributeStoreError(err))
      return ''
    }
  }

const resetAttributeStore = (): Action => attributeStoreReset()

export { deployAttributeStore, resetAttributeStore }

