/**
 * We have to setup a Web3 instance for our state tree. The user need not
 * enter any more information than websocket address, we'll then make a web3
 * instance from that, with a WebSocketProvider set.
 */
declare const setWebsocketAddress: (address: string) => void;
declare const resetWebsocketAddress: () => void;
export { setWebsocketAddress, resetWebsocketAddress };
