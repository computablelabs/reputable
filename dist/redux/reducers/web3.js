"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const web3_1 = require("../action-creators/web3");
const createReducer_1 = __importDefault(require("./createReducer"));
const initialState = {
    loading: false,
    request: {},
    data: { address: '' },
    error: undefined,
};
const handlers = {
    [web3_1.WEBSOCKET_ADDRESS_SET]: (state, { payload }) => (Object.assign({}, state, { loading: false, data: {
            address: payload.address,
        } })),
    [web3_1.RESET_WEBSOCKET_ADDRESS]: () => (Object.assign({}, initialState))
};
exports.default = createReducer_1.default(handlers, initialState);
