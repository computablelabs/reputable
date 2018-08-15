"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const transfer_1 = require("../action-creators/token/transfer");
const createReducer_1 = __importDefault(require("./createReducer"));
const initialState = {
    loading: false,
    request: {},
    data: {},
    error: undefined,
};
const handlers = {
    [transfer_1.TOKEN_TRANSFER_REQUEST]: (state, { payload }) => (Object.assign({}, state, { loading: true, request: payload })),
    [transfer_1.TOKEN_TRANSFER_OK]: (state, { payload }) => (Object.assign({}, state, { loading: false, data: Object.assign({}, state.data, { [payload.id]: payload }) })),
    [transfer_1.TOKEN_TRANSFER_ERROR]: (state, { payload }) => (Object.assign({}, state, { loading: false, error: payload.toString() })),
    [transfer_1.TOKEN_TRANSFER_RESET]: (state, { payload }) => (Object.assign({}, initialState)),
};
exports.default = createReducer_1.default(handlers, initialState);
