"use strict";
/**
 * Top level reducer for the registry state pieces.
 * Subdivides the responsibility of managing:
 * * applicants
 * * challenges
 * * listings
 */
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const constants_1 = require("../../constants");
const address = (address = '', action) => {
    const map = {
        [constants_1.DEPLOYED_REGISTRY]: () => action.payload.address,
        [constants_1.RESET_REGISTRY]: () => '',
    };
    return map[action.type] ? map[action.type]() : address;
};
const applicants = (state = [], action) => {
    const map = {
        // we will add an applicant to the state tree
        [constants_1.APPLY]: () => ([
            ...state,
            {
                name: action.payload.name,
                deposit: action.payload.deposit,
                data: action.payload.data,
            }
        ]),
        [constants_1.RESET_REGISTRY]: () => ([]),
    };
    return map[action.type] ? map[action.type]() : state;
};
// TODO this
const challenges = (state = [], action) => {
    const map = {
        [constants_1.CHALLENGE]: () => ([
            ...state,
            {}
        ]),
        [constants_1.RESET_REGISTRY]: () => ([]),
    };
    return map[action.type] ? map[action.type]() : state;
};
const listings = (state = [], action) => {
    const map = {
        // LIST action invoked when the ETHVM returns us the listing
        [constants_1.LIST]: () => ([
            ...state,
            {
                hash: action.payload.hash,
                applicationExpiry: action.payload.applicationExpiry,
                whitelisted: action.payload.whitelisted,
                owner: action.payload.owner,
                unstakedDeposit: action.payload.unstakedDeposit,
            }
        ]),
        [constants_1.RESET_REGISTRY]: () => ([]),
    };
    return map[action.type] ? map[action.type]() : state;
};
exports.default = redux_1.combineReducers({
    address,
    applicants,
    challenges,
    listings,
});
