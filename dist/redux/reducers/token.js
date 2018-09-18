"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const token_1 = require("../action-creators/token");
const createReducer_1 = __importDefault(require("./createReducer"));
const initialState = {
    loading: false,
    request: {},
    data: {
        address: undefined,
        supply: undefined,
        approvals: [],
        transfers: [],
    },
    error: undefined,
};
const handlers = {
    [token_1.TOKEN_RESET]: () => (Object.assign({}, initialState)),
    [token_1.TOKEN_DEPLOY_REQUEST]: (state, { payload }) => (Object.assign({}, state, { loading: true, request: payload })),
    [token_1.TOKEN_DEPLOY_OK]: (state, { payload }) => (Object.assign({}, state, { loading: false, data: Object.assign({}, state.data, { address: payload.address, supply: payload.supply }) })),
    [token_1.TOKEN_DEPLOY_ERROR]: (state, { payload }) => (Object.assign({}, state, { loading: false, error: payload.toString() })),
    [token_1.TOKEN_ADDRESS_OK]: (state, { payload }) => (Object.assign({}, state, { loading: false, data: Object.assign({}, state.data, { address: payload.address }) })),
    [token_1.TOKEN_ADDRESS_RESET]: (state) => (Object.assign({}, state, { data: Object.assign({}, state.data, { address: initialState.data.address, supply: initialState.data.supply }) })),
    [token_1.TOKEN_APPROVE_REQUEST]: (state, { payload }) => (Object.assign({}, state, { loading: true, request: payload })),
    [token_1.TOKEN_APPROVE_OK]: (state, { payload }) => (Object.assign({}, state, { loading: false, data: Object.assign({}, state.data, { approvals: [
                ...state.data.approvals || [],
                payload,
            ] }) })),
    [token_1.TOKEN_APPROVE_ERROR]: (state, { payload }) => (Object.assign({}, state, { loading: false, error: payload.toString() })),
    [token_1.TOKEN_APPROVE_RESET]: (state) => (Object.assign({}, state, { data: Object.assign({}, state.data, { approvals: initialState.data.approvals }) })),
    [token_1.TOKEN_TRANSFER_REQUEST]: (state, { payload }) => (Object.assign({}, state, { loading: true, request: payload })),
    [token_1.TOKEN_TRANSFER_OK]: (state, { payload }) => (Object.assign({}, state, { loading: false, data: Object.assign({}, state.data, { transfers: [
                ...state.data.transfers || [],
                payload,
            ] }) })),
    [token_1.TOKEN_TRANSFER_ERROR]: (state, { payload }) => (Object.assign({}, state, { loading: false, error: payload.toString() })),
    [token_1.TOKEN_TRANSFER_RESET]: (state) => (Object.assign({}, state, { data: Object.assign({}, state.data, { transfers: initialState.data.transfers }) })),
};
exports.default = createReducer_1.default(handlers, initialState);
