import { State, Token, Approval, Transfer } from '../../interfaces';
declare const getToken: (state?: State) => Token | undefined;
declare const getTokenAddress: (state?: State) => string;
declare const getApprovals: (state?: State) => Approval[];
declare const getTransfers: (state?: State, { ids }?: any) => Transfer[];
export { getToken, getTokenAddress, getApprovals, getTransfers, };
