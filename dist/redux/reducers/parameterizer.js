"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parameterizer_1 = require("../action-creators/parameterizer");
const createReducer_1 = __importDefault(require("./createReducer"));
const initialState = {
    loading: false,
    request: {},
    data: { address: '' },
    error: undefined,
};
const handlers = {
    [parameterizer_1.PARAMETERIZER_RESET]: () => (Object.assign({}, initialState)),
    [parameterizer_1.PARAMETERIZER_DEPLOY_REQUEST]: (state, { payload }) => (Object.assign({}, state, { loading: true, request: payload })),
    [parameterizer_1.PARAMETERIZER_DEPLOY_OK]: (state, { payload }) => (Object.assign({}, state, { loading: false, data: Object.assign({}, state.data, { address: payload.address }) })),
    [parameterizer_1.PARAMETERIZER_DEPLOY_ERROR]: (state, { payload }) => (Object.assign({}, state, { loading: false, error: payload.toString() })),
    [parameterizer_1.PARAMETERIZER_ADDRESS_OK]: (state, { payload }) => (Object.assign({}, state, { loading: false, data: Object.assign({}, state.data, { address: payload.address }) })),
    [parameterizer_1.PARAMETERIZER_ADDRESS_RESET]: (state, { payload }) => (Object.assign({}, state, { laoding: initialState.loading, request: initialState.request, error: initialState.error, data: Object.assign({}, state.data, { address: initialState.data.address }) })),
};
exports.default = createReducer_1.default(handlers, initialState);
