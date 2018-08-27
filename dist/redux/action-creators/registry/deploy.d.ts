export declare const REGISTRY_DEPLOY_REQUEST = "REGISTRY_DEPLOY_REQUEST";
export declare const REGISTRY_DEPLOY_OK = "REGISTRY_DEPLOY_OK";
export declare const REGISTRY_DEPLOY_ERROR = "REGISTRY_DEPLOY_ERROR";
export declare const REGISTRY_ADDRESS_OK = "REGISTRY_ADDRESS_OK";
export declare const REGISTRY_ADDRESS_RESET = "REGISTRY_ADDRESS_RESET";
declare const deployRegistry: (name: string) => any;
declare const setRegistryAddress: (registryAddress: string) => any;
declare const resetRegistryAddress: () => any;
export { deployRegistry, setRegistryAddress, resetRegistryAddress };
