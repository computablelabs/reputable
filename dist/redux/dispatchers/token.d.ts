import { TransactionReceipt } from 'web3/types.d';
declare const approve: (address: string, amount: string | number, from: string) => Promise<TransactionReceipt>;
declare const transfer: (to: string, amount: string | number, from: string) => Promise<TransactionReceipt>;
declare const deployToken: (address?: string | undefined, supply?: string | number | undefined) => Promise<string>;
declare const resetToken: () => void;
export { approve, transfer, deployToken, resetToken };
