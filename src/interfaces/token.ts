import { Nos } from 'computable/dist/types'
import { Erc20DeployParams } from 'computable/dist/interfaces'
import { Deployed } from './general'
import Erc20 from 'computable/dist/contracts/erc-20'

/**
 * Represent the data shape we maintain locally for the deployed token that this system uses
 */

// TODO do we want any friendly names in here?
export interface Approval extends Deployed {
  amount:Nos; // how much approved to spend
  from:string; // address of the approver
}

export interface Transfer {
  to:string; // the address to transfer the funds to
  amount:Nos; // amount to transfer
  from:string; // the owner of the funds being transferred
}

// all the deployed params, the returned address, and any future transactions.
// we will re-use the `address` attribute in the Erc20DeployParams as the actual deployed
// address of the token, so that it may be re-created on demand (vs stored in state)
export interface Token extends Erc20DeployParams {
  transfers?:Transfer[];
  approvals?:Approval[];
}
