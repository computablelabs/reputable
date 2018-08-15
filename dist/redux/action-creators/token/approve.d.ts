import { Action } from '../../../interfaces';
export declare const TOKEN_APPROVE_REQUEST = "TOKEN_APPROVE_REQUEST";
export declare const TOKEN_APPROVE_OK = "TOKEN_APPROVE_OK";
export declare const TOKEN_APPROVE_ERROR = "TOKEN_APPROVE_ERROR";
export declare const TOKEN_APPROVE_RESET = "TOKEN_APPROVE_RESET";
declare const approve: (address: string, amount: string | number, from?: string | undefined) => any;
declare const resetTokenApprove: () => Action;
export { approve, resetTokenApprove };
