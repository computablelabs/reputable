import Web3 from 'web3';
interface Web3Options {
    force?: boolean;
}
declare const getWeb3: (address: string, { force }?: Web3Options) => Web3;
declare const getProvider: () => any;
export { getWeb3, getProvider };
