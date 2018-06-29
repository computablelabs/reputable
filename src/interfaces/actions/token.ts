import { Erc20DeployParams } from 'computable/dist/interfaces'
import Erc20 from 'computable/dist/contracts/erc-20'
import Action from './action'
import { Approval, Transfer } from '../token'
import { Nos } from 'computable/dist/types'

/**
 * the action creator shape here is the token deploy params + a type
 */
export interface DeployToken extends Erc20DeployParams {
  type:string;
}

// we won't have the address until post deploy
export interface DeployedToken extends Action {
  address?:string; // optional here so TSC doesn't complain in the reducer
  // address is hoisted as we could just use token.getAddress...
  contract?:Erc20;
}

export interface Approve extends Approval {
  type:string;
}

export interface TransferAction extends Transfer {
  type:string;
}
