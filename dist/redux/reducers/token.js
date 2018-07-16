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
    // we won't have an actual address until the VM sends back the TX from deploy
    if (action.type === constants_1.DEPLOYED_TOKEN)
        return action.payload.address;
    return address;
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
    };
    // @ts-ignore:7017
    return map[action.type] ? map[action.type]() : state;
};
const supply = (supply = 0, action) => {
    if (action.type === constants_1.DEPLOY_TOKEN)
        return action.payload.supply;
    return supply;
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
    };
    // @ts-ignore:7017
    return map[action.type] ? map[action.type]() : state;
};
exports.default = redux_1.combineReducers({
    address,
    supply,
    approvals,
    transfers,
});
