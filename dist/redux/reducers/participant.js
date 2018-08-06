"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const participant_1 = require("../action-creators/participant");
const createReducer_1 = __importDefault(require("./createReducer"));
const initialState = {
    loading: false,
    request: {},
    data: {},
    error: undefined,
};
const handlers = {
    [participant_1.PARTICIPANTS_OK]: (state, { payload }) => {
        payload.owner = !Object.keys(state.data).length;
        return Object.assign({}, state, { loading: false, data: Object.assign({}, state.data, { [payload.address]: payload }) });
    },
    [participant_1.PARTICIPANTS_RESET]: (state, { payload }) => (Object.assign({}, initialState)),
};
exports.default = createReducer_1.default(handlers, initialState);
