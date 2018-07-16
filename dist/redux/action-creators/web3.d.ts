import { Action, FSA } from '../../interfaces';
declare const setWebsocketAddress: (address: string) => FSA;
declare const resetWebsocketAddress: () => Action;
export { setWebsocketAddress, resetWebsocketAddress };
