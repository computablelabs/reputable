import { FSA, Map, Deployed } from '../../../interfaces';
export declare const DLL_REQUEST = "DLL_REQUEST";
export declare const DLL_OK = "DLL_OK";
export declare const DLL_ERROR = "DLL_ERROR";
export declare const DLL_RESET = "DLL_RESET";
export declare const dllRequest: (value: Map) => FSA;
export declare const dllOk: (value: Deployed) => FSA;
export declare const dllError: (value: Error) => FSA;
export declare const dllReset: () => FSA;
