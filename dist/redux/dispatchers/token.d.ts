declare const approve: (address: string, amount: string | number, from: string) => Promise<{
    [key: string]: string;
}>;
declare const transfer: (to: string, amount: string | number, from: string) => Promise<{
    [key: string]: string;
}>;
declare const deployToken: (address?: string | undefined, supply?: string | number | undefined) => Promise<string>;
declare const resetToken: () => void;
export { approve, transfer, deployToken, resetToken };
