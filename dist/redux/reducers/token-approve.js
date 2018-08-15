"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const approve_1 = require("../action-creators/token/approve");
const createReducer_1 = __importDefault(require("./createReducer"));
const initialState = {
    loading: false,
    request: {},
    data: {},
    error: undefined,
};
const handlers = {
    [approve_1.TOKEN_APPROVE_REQUEST]: (state, { payload }) => (Object.assign({}, state, { loading: true, request: payload })),
    [approve_1.TOKEN_APPROVE_OK]: (state, { payload }) => (Object.assign({}, state, { loading: false, data: Object.assign({}, state.data, { [payload.address]: payload }) })),
    [approve_1.TOKEN_APPROVE_ERROR]: (state, { payload }) => (Object.assign({}, state, { loading: false, error: payload.toString() })),
    [approve_1.TOKEN_APPROVE_RESET]: (state, { payload }) => (Object.assign({}, initialState)),
};
exports.default = createReducer_1.default(handlers, initialState);
