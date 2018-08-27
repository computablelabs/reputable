export declare const TOKEN_TRANSFER_REQUEST = "TOKEN_TRANSFER_REQUEST";
export declare const TOKEN_TRANSFER_OK = "TOKEN_TRANSFER_OK";
export declare const TOKEN_TRANSFER_ERROR = "TOKEN_TRANSFER_ERROR";
export declare const TOKEN_TRANSFER_RESET = "TOKEN_TRANSFER_RESET";
interface RegistryTransferParams {
    to: string;
    amount: number;
    from?: string;
}
declare const transfer: ({ to, amount, from }: RegistryTransferParams) => any;
declare const resetTokenTransfer: () => any;
export { transfer, resetTokenTransfer };
