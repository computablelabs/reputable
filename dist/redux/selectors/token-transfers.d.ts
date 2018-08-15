import { State, Transfer } from '../../interfaces';
declare const getTransfers: (state?: State, { ids }?: any) => Transfer[];
declare const getTransfer: (state: State | undefined, key: string) => Transfer;
export { getTransfers, getTransfer };
