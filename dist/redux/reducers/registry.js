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
        challenges: {},
        listings: {},
    },
    error: undefined,
};
const handlers = {
    [registry_1.REGISTRY_RESET]: () => (Object.assign({}, initialState)),
    [registry_1.REGISTRY_DEPLOY_REQUEST]: (state, { payload }) => (Object.assign({}, state, { loading: true, request: payload })),
    [registry_1.REGISTRY_DEPLOY_OK]: (state, { payload }) => (Object.assign({}, state, { loading: false, data: Object.assign({}, state.data, { address: payload.address }) })),
    [registry_1.REGISTRY_DEPLOY_ERROR]: (state, { payload }) => (Object.assign({}, state, { loading: false, error: payload.toString() })),
    [registry_1.REGISTRY_ADDRESS_OK]: (state, { payload }) => (Object.assign({}, state, { loading: false, data: Object.assign({}, state.data, { address: payload.address }) })),
    [registry_1.REGISTRY_ADDRESS_RESET]: (state) => (Object.assign({}, state, { data: Object.assign({}, state.data, { address: initialState.data.address }) })),
    [registry_1.REGISTRY_LISTING_REQUEST]: (state, { payload }) => (Object.assign({}, state, { loading: true, request: payload })),
    [registry_1.REGISTRY_LISTING_OK]: (state, { payload }) => {
        const listings = state.data.listings || {};
        const listing = Object.assign({}, listings[payload.listingHash], payload);
        return Object.assign({}, state, { loading: false, data: Object.assign({}, state.data, { listings: Object.assign({}, listings, { [payload.listingHash]: listing }) }) });
    },
    [registry_1.REGISTRY_LISTING_REMOVE]: (state, { payload }) => {
        const listings = state.data.listings || {};
        delete listings[payload];
        return Object.assign({}, state, { loading: false, data: Object.assign({}, state.data, { listings }) });
    },
    [registry_1.REGISTRY_LISTING_ERROR]: (state, { payload }) => (Object.assign({}, state, { loading: false, error: payload.toString() })),
    [registry_1.REGISTRY_LISTING_RESET]: (state) => (Object.assign({}, state, { data: Object.assign({}, state.data, { listings: initialState.data.listings }) })),
    [registry_1.REGISTRY_APPLY_REQUEST]: (state, { payload }) => (Object.assign({}, state, { loading: true, request: payload })),
    [registry_1.REGISTRY_APPLY_OK]: (state, { payload }) => {
        const listings = state.data.listings || {};
        const listing = Object.assign({}, listings[payload.listingHash], payload);
        return Object.assign({}, state, { loading: false, data: Object.assign({}, state.data, { listings: Object.assign({}, listings, { [payload.listingHash]: listing }) }) });
    },
    [registry_1.REGISTRY_APPLY_ERROR]: (state, { payload }) => (Object.assign({}, state, { loading: false, error: payload.toString() })),
    [registry_1.REGISTRY_CHALLENGE_REQUEST]: (state, { payload }) => (Object.assign({}, state, { loading: true, request: payload })),
    [registry_1.REGISTRY_CHALLENGE_OK]: (state, { payload }) => {
        const challenges = state.data.challenges || {};
        const challenge = Object.assign({}, challenges[payload.id], payload);
        return Object.assign({}, state, { loading: false, data: Object.assign({}, state.data, { challenges: Object.assign({}, challenges, { [payload.id]: challenge }) }) });
    },
    [registry_1.REGISTRY_CHALLENGE_ERROR]: (state, { payload }) => (Object.assign({}, state, { loading: false, error: payload.toString() })),
    [registry_1.REGISTRY_CHALLENGE_RESET]: (state, { payload }) => (Object.assign({}, state, { data: Object.assign({}, state.data, { challenges: initialState.data.challenges }) }))
};
exports.default = createReducer_1.default(handlers, initialState);
