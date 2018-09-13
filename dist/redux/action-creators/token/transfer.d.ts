interface RegistryTransferParams {
    to: string;
    amount: number;
    from?: string;
}
declare const transfer: ({ to, amount, from }: RegistryTransferParams) => any;
declare const resetTokenTransfer: () => any;
export { transfer, resetTokenTransfer };
