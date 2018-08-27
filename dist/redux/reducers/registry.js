"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const registry_1 = require("../action-creators/registry");
const createReducer_1 = __importDefault(require("./createReducer"));
const initialState = {
    loading: false,
    request: {},
    data: {
        address: undefined,
        applicants: [],
        challenges: [],
        listings: [],
    },
    error: undefined,
};
const handlers = {
    [registry_1.REGISTRY_DEPLOY_REQUEST]: (state, { payload }) => (Object.assign({}, state, { loading: true, request: payload })),
    [registry_1.REGISTRY_DEPLOY_OK]: (state, { payload }) => (Object.assign({}, state, { loading: false, data: Object.assign({}, state.data, { address: payload.address }) })),
    [registry_1.REGISTRY_DEPLOY_ERROR]: (state, { payload }) => (Object.assign({}, state, { loading: false, error: payload.toString() })),
    [registry_1.REGISTRY_ADDRESS_OK]: (state, { payload }) => (Object.assign({}, state, { loading: false, data: Object.assign({}, state.data, { address: payload.address }) })),
    [registry_1.REGISTRY_ADDRESS_RESET]: (state) => (Object.assign({}, state, { data: Object.assign({}, state.data, { address: initialState.data.address }) })),
    [registry_1.REGISTRY_APPLY_REQUEST]: (state, { payload }) => (Object.assign({}, state, { loading: true, request: payload })),
    [registry_1.REGISTRY_APPLY_OK]: (state, { payload }) => (Object.assign({}, state, { loading: false, data: Object.assign({}, state.data, { applicants: [
                ...state.data.applicants || [],
                payload,
            ] }) })),
    [registry_1.REGISTRY_APPLY_ERROR]: (state, { payload }) => (Object.assign({}, state, { loading: false, error: payload.toString() })),
    [registry_1.REGISTRY_APPLY_RESET]: (state) => (Object.assign({}, state, { data: Object.assign({}, state.data, { applicants: initialState.data.applicants }) })),
    ['LIST']: (state, { payload }) => (Object.assign({}, state, { data: Object.assign({}, state.data, { listings: [
                ...state.data.listings || [],
                payload,
            ] }) })),
};
exports.default = createReducer_1.default(handlers, initialState);
