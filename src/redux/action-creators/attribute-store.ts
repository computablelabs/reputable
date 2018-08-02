import Web3 from 'web3'
import { Contract } from 'web3/types.d'
import { deployAttributeStore as deploy } from 'computable/dist/helpers'
import {
  Action,
  FSA,
  State,
  Deployed,
  Participant,
} from '../../interfaces'
import {
  DEPLOY_ATTRIBUTE_STORE,
  DEPLOY_ATTRIBUTE_STORE_ERROR,
  DEPLOYED_ATTRIBUTE_STORE,
  RESET_ATTRIBUTE_STORE,
  Errors,
} from '../../constants'
import { getParticipants } from '../selectors'

/**
 * It is debateable how useful the full range of actions are for deploying the two
 * voting contract dependencies (dll, attrStore). That being said, I'm just being consistent so...
 *
 * Note that there is no Higher Order Contract for them, but a helper for each
 */

const deployStoreAction = (): Action => ({ type: DEPLOY_ATTRIBUTE_STORE })

const deployedStore = (address:string): FSA => {
  const payload:Deployed = { address }
  return { type: DEPLOYED_ATTRIBUTE_STORE, payload }
}

const deployStoreError = (err:Error): FSA => ({ type: DEPLOY_ATTRIBUTE_STORE_ERROR, payload: err })

const deployAttributeStore = (address?:string): any => {
  return async (dispatch:any, getState:any): Promise<string> => {
    const state:State = getState(),
      participants = getParticipants(state),
      admin:Participant|undefined = participants && participants[0],
      websocketAddress = state.websocketAddress

    let storeAddress:string = '', store:Contract

    if (!websocketAddress) dispatch(deployStoreError(new Error(Errors.NO_WEBSOCKETADDRESS_FOUND)))
    else if (!admin) dispatch(deployStoreError(new Error(Errors.NO_ADMIN_FOUND)))
    else {
      const web3 = new Web3(new Web3.providers.WebsocketProvider(websocketAddress))
      dispatch(deployStoreAction())

      try {
        // note that the computable deploy helpers return the actual contract
        store = await deploy(web3, address || admin.address)
        // any raw web3.eth.Contract will have its address @ contract.options.address
        storeAddress = store.options.address
        dispatch(deployedStore(storeAddress))
      } catch(err) {
        dispatch(deployStoreError(err))
      }
    }

    return storeAddress
  }
}

const resetAttributeStore = (): Action => ({ type: RESET_ATTRIBUTE_STORE })

export { deployAttributeStore, resetAttributeStore }
