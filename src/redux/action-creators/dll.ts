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
import {
  DEPLOY_DLL,
  DEPLOY_DLL_ERROR,
  DEPLOYED_DLL,
  RESET_DLL,
  Errors,
} from '../../constants'

/**
 * It is debateable how useful the full range of actions are for deploying the two
 * voting contract dependencies (dll, attrStore). That being said, I'm just being consistent so...
 *
 * Note that there is no Higher Order Contract for them, but a helper for each
 */

const deployDllAction = (): Action => ({ type: DEPLOY_DLL })

const deployedDll = (address:string): FSA => {
  const payload:Deployed = { address }
  return { type: DEPLOYED_DLL, payload }
}

const deployDllError = (err:Error): FSA => ({ type: DEPLOY_DLL_ERROR, payload: err })

const deployDll = (address?:string): any => {
  return async (dispatch:any, getState:any): Promise<string> => {
    const state:State = getState(),
      admin:Participant|undefined = state.participants && state.participants[0],
      websocketAddress = state.websocketAddress

    let dllAddress:string = '', dll:Contract

    if (!websocketAddress) dispatch(deployDllError(new Error(Errors.NO_WEBSOCKETADDRESS_FOUND)))
    else if (!admin) dispatch(deployDllError(new Error(Errors.NO_ADMIN_FOUND)))
    else {
      const web3 = new Web3(new Web3.providers.WebsocketProvider(websocketAddress))
      dispatch(deployDllAction())

      try {
        // note that the computable deploy helpers return the actual contract
        dll = await deploy(web3, address || admin.address)
        // any raw web3.eth.Contract will have its address @ contract.options.address
        dllAddress = dll.options.address
        dispatch(deployedDll(dllAddress))
      } catch(err) {
        dispatch(deployDllError(err))
      }
    }

    return dllAddress
  }
}

const resetDll = (): Action => ({ type: RESET_DLL })

export { deployDll, resetDll }
