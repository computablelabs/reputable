import { Action } from '../../../interfaces';
export declare const TOKEN_TRANSFER_REQUEST = "TOKEN_TRANSFER_REQUEST";
export declare const TOKEN_TRANSFER_OK = "TOKEN_TRANSFER_OK";
export declare const TOKEN_TRANSFER_ERROR = "TOKEN_TRANSFER_ERROR";
export declare const TOKEN_TRANSFER_RESET = "TOKEN_TRANSFER_RESET";
declare const transfer: (to: string, amount: string | number, from?: string | undefined) => any;
declare const resetTokenTransfer: () => Action;
export { transfer, resetTokenTransfer };
