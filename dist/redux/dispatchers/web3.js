"use strict";
/**
 * We have to setup a Web3 instance for our state tree. The user need not
 * enter any more information than websocket address, we'll then make a web3
 * instance from that, with a WebSocketProvider set.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = __importDefault(require("../store"));
const web3_1 = require("../action-creators/web3");
const setWebsocketAddress = (address) => {
    store_1.default.dispatch(web3_1.setWebsocketAddress(address));
};
exports.setWebsocketAddress = setWebsocketAddress;
const resetWebsocketAddress = () => {
    // const o:Action = { type: RESET_WEB3 }
    store_1.default.dispatch(web3_1.resetWebsocketAddress());
};
exports.resetWebsocketAddress = resetWebsocketAddress;
