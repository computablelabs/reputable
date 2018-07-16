"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants");
const setWebsocketAddress = (address) => ({
    type: constants_1.WEBSOCKET_ADDRESS_SET,
    payload: {
        // user can then instantiate web3 on demand via:
        // new Web3(new Web3.providers.WebsocketProvider(address))
        websocketAddress: address,
    },
});
exports.setWebsocketAddress = setWebsocketAddress;
const resetWebsocketAddress = () => ({ type: constants_1.RESET_WEBSOCKET_ADDRESS });
exports.resetWebsocketAddress = resetWebsocketAddress;
