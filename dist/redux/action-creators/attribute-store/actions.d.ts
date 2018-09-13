import { FSA, Map, Deployed } from '../../../interfaces';
export declare const ATTRIBUTE_STORE_REQUEST = "ATTRIBUTE_STORE_REQUEST";
export declare const ATTRIBUTE_STORE_OK = "ATTRIBUTE_STORE_OK";
export declare const ATTRIBUTE_STORE_ERROR = "ATTRIBUTE_STORE_ERROR";
export declare const ATTRIBUTE_STORE_RESET = "ATTRIBUTE_STORE_RESET";
export declare const attributeStoreRequest: (value: Map) => FSA;
export declare const attributeStoreOk: (value: Deployed) => FSA;
export declare const attributeStoreError: (value: Error) => FSA;
export declare const attributeStoreReset: () => FSA;
