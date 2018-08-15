"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apply_1 = require("../action-creators/registry/apply");
const createReducer_1 = __importDefault(require("./createReducer"));
const initialState = {
    loading: false,
    request: {},
    data: {},
    error: undefined,
};
const handlers = {
    [apply_1.REGISTRY_APPLY_REQUEST]: (state, { payload }) => (Object.assign({}, state, { loading: true, request: payload })),
    // we will add an applicant to the state tree
    [apply_1.REGISTRY_APPLY_OK]: (state, { payload }) => (Object.assign({}, state, { loading: false, data: Object.assign({}, state.data, { [payload.listing]: payload }) })),
    [apply_1.REGISTRY_APPLY_ERROR]: (state, { payload }) => (Object.assign({}, state, { loading: false, error: payload.toString() })),
    [apply_1.REGISTRY_APPLY_RESET]: (state, { payload }) => (Object.assign({}, initialState)),
};
exports.default = createReducer_1.default(handlers, initialState);
