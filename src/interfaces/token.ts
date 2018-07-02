import { Nos } from 'computable/dist/types'
import { Erc20DeployParams } from 'computable/dist/interfaces'
import Erc20 from 'computable/dist/contracts/erc-20'

/**
 * Represent the data shape we maintain locally for the deployed token that this system uses
 */

export interface DeployedToken {
  address:string;
  contract: Erc20;
}

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

// all the deployed params, the returned address, and any future transactions.
// some of these values, like address, are hoisted from things you could get via the contract.
// with further dev we can decide what to hoist, and what to always fetch via contract methods
export interface Token extends Erc20DeployParams {
  contract?:Erc20;
  transfers?:Transfer[];
  approvals?:Approval[];
}
