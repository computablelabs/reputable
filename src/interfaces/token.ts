import { Nos } from 'computable/dist/types'
import { Erc20DeployParams } from 'computable/dist/interfaces'
/**
 * Represent the data shape we maintain locally for the deployed token that this system uses
 */

import { DeployedToken } from './actions/token'

// TODO do we want any friendly names in here?
export interface Approval {
  address:string; // address of the contract approved
  amount:Nos; // how much approved to spend
  from:string; // address of the approver
}

export interface Transfer {
  to:string; // the address to transfer the funds to
  from:string; // the owner of the funds being transferred
  amount:Nos; // amount to transfer
}

// all the deployed params, the returned address, and any future transactions
export interface Token extends DeployedToken, Erc20DeployParams {
  transfers?:Transfer[];
  approvals?:Approval[];
}
