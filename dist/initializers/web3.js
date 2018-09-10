"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const web3_1 = __importDefault(require("web3"));
let provider;
let web3;
const getWeb3 = (address, { force = false } = {}) => {
    if (!provider || force) {
        provider = new web3_1.default.providers.WebsocketProvider(address);
    }
    if (!web3 || force) {
        web3 = new web3_1.default(provider);
    }
    return web3;
};
exports.getWeb3 = getWeb3;
const getProvider = () => {
    if (!provider) {
        return undefined;
    }
    return provider;
};
exports.getProvider = getProvider;
