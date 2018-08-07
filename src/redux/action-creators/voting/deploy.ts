import Web3 from 'web3'
import Voting from 'computable/dist/contracts/plcr-voting'
import { address as getTokenAddress } from '../../selectors/token'
import { getParticipants, getDllAddress } from '../../selectors'
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
    const state:State = getState(),
      // TODO 'admin' selector maybe...
      participants = getParticipants(state),
      admin:Participant|undefined = participants && participants[0],
      websocketAddress = state.websocketAddress,
      tokenAddress = getTokenAddress(state),
      dllAddress = getDllAddress(state),
      attributeStoreAddress = state.attributeStoreAddress

    let votingAddress = ''

    if (!websocketAddress) dispatch(deployVotingError(new Error(Errors.NO_WEBSOCKETADDRESS_FOUND)))
    else if (!admin) dispatch(deployVotingError(new Error(Errors.NO_ADMIN_FOUND)))
    else if (!tokenAddress) dispatch(deployVotingError(new Error(Errors.NO_TOKEN_FOUND)))
    else if (!dllAddress) dispatch(deployVotingError(new Error(Errors.NO_DLL_FOUND)))
    else if (!attributeStoreAddress) dispatch(deployVotingError(new Error(Errors.NO_ATTRIBUTESTORE_FOUND)))
    else {
      // create web3 on demand with our provider
      const web3 = new Web3(new Web3.providers.WebsocketProvider(websocketAddress))
        // we can dispatch deploy early here, as deploy is not to be confused with deployed)
      dispatch(deployVotingAction())
      // now that the deploy action is in flight, do the actual evm deploy and wait for the address
      const contract = new Voting(address || admin.address)

      try {
        votingAddress = await contract.deploy(web3,
          { tokenAddress, dllAddress, attributeStoreAddress })

        dispatch(deployedVoting(votingAddress))
      } catch(err) {
        dispatch(deployVotingError(err))
      }
    }

    return votingAddress
  }
}

const resetVoting = (): Action => ({ type: RESET_VOTING })

export {
  deployVoting,
  resetVoting,
}
