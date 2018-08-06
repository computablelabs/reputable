"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defaultState = {
    loading: false,
    request: {},
    data: {},
};
const createReducer = (handlers, initialState = defaultState) => (state = initialState, action) => {
    const handler = handlers[action.type];
    return handler ? handler(state, action) : state;
};
exports.default = createReducer;
