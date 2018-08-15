import { State, Approval } from '../../interfaces';
declare const getApprovals: (state?: State, { ids }?: any) => Approval[];
declare const getApproval: (state: State | undefined, key: string) => Approval;
export { getApprovals, getApproval };
