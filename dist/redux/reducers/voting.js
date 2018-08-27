"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const voting_1 = require("../action-creators/voting");
const createReducer_1 = __importDefault(require("./createReducer"));
const initialState = {
    loading: false,
    request: {},
    data: { address: '' },
    error: undefined,
};
const handlers = {
    [voting_1.VOTING_DEPLOY_REQUEST]: (state, { payload }) => (Object.assign({}, state, { loading: true, request: payload })),
    [voting_1.VOTING_DEPLOY_OK]: (state, { payload }) => (Object.assign({}, state, { loading: false, data: Object.assign({}, state.data, { address: payload.address }) })),
    [voting_1.VOTING_DEPLOY_ERROR]: (state, { payload }) => (Object.assign({}, state, { loading: false, error: payload.toString() })),
    [voting_1.VOTING_ADDRESS_OK]: (state, { payload }) => (Object.assign({}, state, { loading: false, data: Object.assign({}, state.data, { address: payload.address }) })),
    [voting_1.VOTING_ADDRESS_RESET]: (state, { payload }) => (Object.assign({}, state, { data: Object.assign({}, state.data, { address: initialState.data.address }) }))
};
exports.default = createReducer_1.default(handlers, initialState);
