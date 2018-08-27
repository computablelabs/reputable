"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const participants_1 = require("../action-creators/participants");
const createReducer_1 = __importDefault(require("./createReducer"));
const initialState = {
    loading: false,
    request: {},
    data: [],
    error: undefined,
};
const handlers = {
    [participants_1.PARTICIPANTS_OK]: (state, { payload }) => {
        payload.owner = !state.data.length;
        return Object.assign({}, state, { loading: false, data: [
                ...state.data || [],
                payload,
            ] });
    },
    [participants_1.PARTICIPANTS_RESET]: () => (Object.assign({}, initialState)),
};
exports.default = createReducer_1.default(handlers, initialState);
