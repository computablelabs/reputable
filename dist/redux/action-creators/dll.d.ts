import { Action } from '../../interfaces';
export declare const DLL_REQUEST = "DLL_REQUEST";
export declare const DLL_OK = "DLL_OK";
export declare const DLL_ERROR = "DLL_ERROR";
export declare const DLL_RESET = "DLL_RESET";
/**
 * It is debateable how useful the full range of actions are for deploying the two
 * voting contract dependencies (dll, attrStore). That being said, I'm just being consistent so...
 *
 * Note that there is no Higher Order Contract for them, but a helper for each
 */
declare const deployDll: (address?: string) => any;
declare const resetDll: () => Action;
export { deployDll, resetDll };
