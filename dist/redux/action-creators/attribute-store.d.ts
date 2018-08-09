import { Action } from '../../interfaces';
export declare const ATTRIBUTE_STORE_REQUEST = "ATTRIBUTE_STORE_REQUEST";
export declare const ATTRIBUTE_STORE_OK = "ATTRIBUTE_STORE_OK";
export declare const ATTRIBUTE_STORE_ERROR = "ATTRIBUTE_STORE_ERROR";
export declare const ATTRIBUTE_STORE_RESET = "ATTRIBUTE_STORE_RESET";
/**
 * It is debateable how useful the full range of actions are for deploying the two
 * voting contract dependencies (dll, attrStore). That being said, I'm just being consistent so...
 *
 * Note that there is no Higher Order Contract for them, but a helper for each
 */
declare const deployAttributeStore: (address?: string) => any;
declare const resetAttributeStore: () => Action;
export { deployAttributeStore, resetAttributeStore };
