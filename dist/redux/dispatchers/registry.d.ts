import { TransactionReceipt } from 'web3/types.d';
declare const apply: (listing: string, userAddress: string, deposit?: string | number | undefined, data?: string | undefined) => Promise<TransactionReceipt>;
declare const deployRegistry: (name: string, address?: string | undefined) => Promise<string>;
declare const resetRegistry: () => void;
export { apply, deployRegistry, resetRegistry };
