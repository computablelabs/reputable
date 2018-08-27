export declare const TOKEN_DEPLOY_REQUEST = "TOKEN_DEPLOY_REQUEST";
export declare const TOKEN_DEPLOY_OK = "TOKEN_DEPLOY_OK";
export declare const TOKEN_DEPLOY_ERROR = "TOKEN_DEPLOY_ERROR";
export declare const TOKEN_ADDRESS_OK = "TOKEN_ADDRESS_OK";
export declare const TOKEN_ADDRESS_RESET = "TOKEN_ADDRESS_RESET";
declare const deployToken: (supply?: number | undefined) => any;
declare const setTokenAddress: (tokenAddress: string) => any;
declare const resetTokenAddress: () => any;
export { deployToken, setTokenAddress, resetTokenAddress };
