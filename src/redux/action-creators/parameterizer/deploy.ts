import Web3 from 'web3'
import { Nos } from 'computable/dist/types'
import { ParameterizerDeployParams } from 'computable/dist/interfaces'
import Parameterizer from 'computable/dist/contracts/parameterizer'
import { address as getTokenAddress } from '../../selectors/token'
import { address as getVotingAddress } from '../../selectors/voting'
import { getParticipants } from '../../selectors'
import {
  Void,
  Action,
  FSA,
  State,
  Deployed,
  Participant,
} from '../../../interfaces'
import {
  DEPLOY_PARAMETERIZER,
  DEPLOY_PARAMETERIZER_ERROR,
  DEPLOYED_PARAMETERIZER,
  RESET_PARAMETERIZER,
  ParameterizerDefaults,
  Errors,
} from '../../../constants'

/**
 * support actions for the thunk deployToken action itself
 */
const deployParameterizerAction = (
  tokenAddress:string,
  votingAddress:string,
  opts:Partial<ParameterizerDeployParams> = {}
): FSA => {
  // normalize the deploy object by defaulting falsy values here
  const payload:ParameterizerDeployParams = {
    // man, can be make the v2 parameterizer less argument-y? TODO
    tokenAddress,
    votingAddress,
    minDeposit: opts.minDeposit || ParameterizerDefaults.MIN_DEPOSIT,
    pMinDeposit: opts.pMinDeposit || ParameterizerDefaults.P_MIN_DEPOSIT,
    applyStageLen: opts.applyStageLen || ParameterizerDefaults.APPLY_STAGE_LEN,
    pApplyStageLen: opts.pApplyStageLen || ParameterizerDefaults.P_APPLY_STAGE_LEN,
    commitStageLen: opts.commitStageLen || ParameterizerDefaults.COMMIT_STAGE_LEN,
    pCommitStageLen: opts.pCommitStageLen || ParameterizerDefaults.P_COMMIT_STAGE_LEN,
    revealStageLen: opts.revealStageLen || ParameterizerDefaults.REVEAL_STAGE_LEN,
    pRevealStageLen: opts.pRevealStageLen || ParameterizerDefaults.P_REVEAL_STAGE_LEN,
    dispensationPct: opts.dispensationPct || ParameterizerDefaults.DISPENSATION_PCT,
    pDispensationPct: opts.pDispensationPct || ParameterizerDefaults.P_DISPENSATION_PCT,
    voteQuorum: opts.voteQuorum || ParameterizerDefaults.VOTE_QUORUM,
    pVoteQuorum: opts.pVoteQuorum || ParameterizerDefaults.P_VOTE_QUORUM,
  }

  return { type: DEPLOY_PARAMETERIZER, payload }
}

/**
 * Note this action can be used if the application is using an already deployed token.
 * Simply dispatch this with the address of said token
 */
const deployedParameterizer = (address:string): FSA => {
  const payload:Deployed = { address }
  return { type: DEPLOYED_PARAMETERIZER, payload }
}

const deployParameterizerError = (err:Error): FSA => (
  { type: DEPLOY_PARAMETERIZER_ERROR, payload: err }
)

/**
 * For applications which have not yet deployed a parameterizer, you can do it from here.
 * Used in Specs and tutorial apps as well...
 *
 * Note that we use the object `opts` here to house any number of the possible arguments, any
 * not specified should fall back to a set of defaults defined here in the app. Also, the
 * computable.js lib itself declares a set of defaults for the parameterizer - so any not specified
 * as defaults in this app will fall-back to those...
 *
 * Use of Partial on the deploy params as we do not expect you to pass the addresses of things already deployed
 */
const deployParameterizer = (address?:string, opts?:Partial<ParameterizerDeployParams>): any => {
  return async (dispatch:any, getState:any): Promise<string> => {
    const state:State = getState(),
      participants = getParticipants(state),
      admin:Participant|undefined = participants && participants[0],
      websocketAddress = state.websocketAddress,
      tokenAddress = getTokenAddress(state),
      votingAddress = getVotingAddress(state)

    let parameterizerAddress = ''

    if (!websocketAddress) dispatch(deployParameterizerError(new Error(Errors.NO_WEBSOCKETADDRESS_FOUND)))
    else if (!admin) dispatch(deployParameterizerError(new Error(Errors.NO_ADMIN_FOUND)))
    else if (!tokenAddress) dispatch(deployParameterizerError(new Error(Errors.NO_TOKEN_FOUND)))
    else if (!votingAddress) dispatch(deployParameterizerError(new Error(Errors.NO_VOTING_FOUND)))
    else {
      // create web3 on demand with our provider
      const web3 = new Web3(new Web3.providers.WebsocketProvider(websocketAddress)),
        // we can dispatch deploy early here, as deploy is not to be confused with deployed
        action = deployParameterizerAction(tokenAddress, votingAddress, opts)

      dispatch(action)
      // now that the deploy action is in flight, do the actual evm deploy and wait for the address
      const contract = new Parameterizer(address || admin.address)

      try {
        // TSC is confused here, the payload is guaranteed to be a ParameterizerDeployParams
        // @ts-ignore:2345
        parameterizerAddress = await contract.deploy(web3, action.payload)
        dispatch(deployedParameterizer(parameterizerAddress))
      } catch(err) {
        dispatch(deployParameterizerError(err))
      }
    }

    return parameterizerAddress
  }
}

const resetParameterizer = (): Action => ({ type: RESET_PARAMETERIZER })

export {
  deployParameterizer,
  resetParameterizer,
}
