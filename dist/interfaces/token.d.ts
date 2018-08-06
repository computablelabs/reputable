import { Nos } from 'computable/dist/types';
import { Erc20DeployParams } from 'computable/dist/interfaces';
import { Deployed } from './general';
/**
 * Represent the data shape we maintain locally for the deployed token that this system uses
 */
export interface Approval extends Deployed {
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
