"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const attribute_store_1 = require("../action-creators/attribute-store");
const createReducer_1 = __importDefault(require("./createReducer"));
const initialState = {
    loading: false,
    request: {},
    data: { address: '' },
    error: undefined,
};
const handlers = {
    [attribute_store_1.ATTRIBUTE_STORE_REQUEST]: (state, { payload }) => (Object.assign({}, state, { loading: true, request: payload })),
    [attribute_store_1.ATTRIBUTE_STORE_OK]: (state, { payload }) => (Object.assign({}, state, { loading: false, data: {
            address: payload.address,
        } })),
    [attribute_store_1.ATTRIBUTE_STORE_ERROR]: (state, { payload }) => (Object.assign({}, state, { loading: false, error: payload.toString() })),
    [attribute_store_1.ATTRIBUTE_STORE_RESET]: () => (Object.assign({}, initialState)),
};
exports.default = createReducer_1.default(handlers, initialState);
