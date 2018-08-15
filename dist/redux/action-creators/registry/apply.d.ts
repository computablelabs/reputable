import { Action } from '../../../interfaces';
export declare const REGISTRY_APPLY_REQUEST = "REGISTRY_APPLY_REQUEST";
export declare const REGISTRY_APPLY_OK = "REGISTRY_APPLY_OK";
export declare const REGISTRY_APPLY_ERROR = "REGISTRY_APPLY_ERROR";
export declare const REGISTRY_APPLY_RESET = "REGISTRY_APPLY_RESET";
declare const apply: (registryAddress: string, listing: string, userAddress: string, deposit: string | number, data?: string | undefined) => any;
declare const resetRegistryApply: () => Action;
export { apply, resetRegistryApply };
