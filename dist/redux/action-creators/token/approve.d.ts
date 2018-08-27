export declare const TOKEN_APPROVE_REQUEST = "TOKEN_APPROVE_REQUEST";
export declare const TOKEN_APPROVE_OK = "TOKEN_APPROVE_OK";
export declare const TOKEN_APPROVE_ERROR = "TOKEN_APPROVE_ERROR";
export declare const TOKEN_APPROVE_RESET = "TOKEN_APPROVE_RESET";
interface TokenApproveParams {
    address: string;
    amount: number;
    from?: string;
}
declare const approve: ({ address, amount, from }: TokenApproveParams) => any;
declare const resetTokenApprove: () => any;
export { approve, resetTokenApprove };
