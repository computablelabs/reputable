"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = __importDefault(require("../store"));
const web3_1 = require("../action-creators/web3");
const resetWebsocketAddress = () => {
    store_1.default.dispatch(web3_1.resetWebsocketAddress());
};
exports.resetWebsocketAddress = resetWebsocketAddress;
