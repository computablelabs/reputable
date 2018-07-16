import { Nos } from 'computable/dist/types';
import { Erc20DeployParams } from 'computable/dist/interfaces';
/**
 * Represent the data shape we maintain locally for the deployed token that this system uses
 */
export interface DeployedToken {
    address: string;
}
export interface Approval {
    address: string;
    amount: Nos;
    from: string;
}
export interface Transfer {
    to: string;
    amount: Nos;
    from: string;
}
export interface Token extends Erc20DeployParams {
    transfers?: Transfer[];
    approvals?: Approval[];
}
