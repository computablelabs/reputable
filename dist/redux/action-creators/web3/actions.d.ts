import { FSA, Deployed } from '../../../interfaces';
export declare const WEBSOCKET_ADDRESS_SET = "WEBSOCKET_ADDRESS_SET";
export declare const RESET_WEBSOCKET_ADDRESS = "RESET_WEBSOCKET_ADDRESS";
export declare const websocketAddressOk: (value: Deployed) => FSA;
export declare const websocketAddressReset: () => FSA;
