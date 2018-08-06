"use strict";
/**
 * Top level reducer for the token state pieces.
 * Subdivides the responsibility of managing:
 * * token
 * * approvals
 * * transfers
 */
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const constants_1 = require("../../constants");
const address = (address = '', action) => {
    const map = {
        [constants_1.DEPLOYED_TOKEN]: () => action.payload.address,
        [constants_1.RESET_TOKEN]: () => '',
    };
    return map[action.type] ? map[action.type]() : address;
};
// TODO create a state piece for an in-flight approval to handle APPROVE
const approvals = (state = [], action) => {
    const map = {
        // we will add an applicant to the state tree
        [constants_1.APPROVED]: () => ([
            ...state,
            {
                address: action.payload.address,
                amount: action.payload.amount,
                from: action.payload.from,
            }
        ]),
        [constants_1.RESET_TOKEN]: () => ([]),
    };
    return map[action.type] ? map[action.type]() : state;
};
const supply = (supply = 0, action) => {
    const map = {
        [constants_1.DEPLOY_TOKEN]: () => action.payload.supply,
        [constants_1.RESET_TOKEN]: () => 0,
    };
    return map[action.type] ? map[action.type]() : supply;
};
const transfers = (state = [], action) => {
    const map = {
        [constants_1.TRANSFER]: () => ([
            ...state,
            {
                to: action.payload.to,
                from: action.payload.from,
                amount: action.payload.amount,
            }
        ]),
        [constants_1.RESET_TOKEN]: () => ([]),
    };
    return map[action.type] ? map[action.type]() : state;
};
exports.default = redux_1.combineReducers({
    address,
    supply,
    approvals,
    transfers,
});
