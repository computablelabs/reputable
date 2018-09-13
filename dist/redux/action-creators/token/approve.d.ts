interface TokenApproveParams {
    address: string;
    amount: number;
    from?: string;
}
declare const approve: ({ address, amount, from }: TokenApproveParams) => any;
declare const resetTokenApprove: () => any;
export { approve, resetTokenApprove };
