import Voting from 'computable/dist/contracts/plcr-voting'
import {
  Action,
  FSA,
  State,
  Deployed,
  Participant,
} from '../../../interfaces'
import {
  DEPLOY_VOTING,
  DEPLOY_VOTING_ERROR,
  DEPLOYED_VOTING,
  RESET_VOTING,
  Errors,
} from '../../../constants'
import {
  getWebsocketAddress,
  getOwner,
  getTokenAddress,
  getDllAddress,
  getAttributeStoreAddress,
} from '../../selectors'
import { getWeb3 } from '../../../helpers'

/**
 * support actions for the thunk action creator
 *
 * Note that we treat the deployment of the DLL and AttributeStore contracts seperate
 * from deploying the Voting contract
 *
 * That does not mean that we can't introduce a bundled action later that deploys
 * the dependencies (dll, attrStore) first, then the voting...
 */

// NOTE all 3 necessary addresses should be in the state tree by this point: token, dll, attributeStore
const deployVotingAction = (): Action => ({ type: DEPLOY_VOTING })

const deployedVoting = (address:string): FSA => {
  const payload:Deployed = { address }
  return { type: DEPLOYED_VOTING, payload }
}

const deployVotingError = (err:Error): FSA => ({ type: DEPLOY_VOTING_ERROR, payload: err })

const deployVoting = (address?:string): any => {
  return async (dispatch:any, getState:any): Promise<string> => {
    const state:State = getState()
    const owner: Participant | undefined = getOwner(state)
    const websocketAddress: string = getWebsocketAddress(state)
    const tokenAddress = getTokenAddress(state)
    const dllAddress = getDllAddress(state)
    const attributeStoreAddress = getAttributeStoreAddress(state)

    let web3

    try {
      web3 = await getWeb3(websocketAddress)
    } catch (err) {
      dispatch(deployVotingError(err))
      return ''
    }

    if (!owner) {
      dispatch(deployVotingError(new Error(Errors.NO_ADMIN_FOUND)))
      return ''
    }

    if (!tokenAddress) {
      dispatch(deployVotingError(new Error(Errors.NO_TOKEN_FOUND)))
      return ''
    }

    if (!dllAddress) {
      dispatch(deployVotingError(new Error(Errors.NO_DLL_FOUND)))
      return ''
    }

    if (!attributeStoreAddress) {
      dispatch(deployVotingError(new Error(Errors.NO_ATTRIBUTESTORE_FOUND)))
      return ''
    }

    // we can dispatch deploy early here, as deploy is not to be confused with deployed)
    dispatch(deployVotingAction())
    // now that the deploy action is in flight, do the actual evm deploy and wait for the address
    const contract = new Voting(address || owner.address)

    try {
      const votingAddress = await contract.deploy(web3, {
        tokenAddress,
        dllAddress,
        attributeStoreAddress,
      })

      dispatch(deployedVoting(votingAddress))

      return votingAddress
    } catch(err) {
      dispatch(deployVotingError(err))
      return ''
    }
  }
}

const resetVoting = (): Action => ({ type: RESET_VOTING })

export {
  deployVoting,
  resetVoting,
}
