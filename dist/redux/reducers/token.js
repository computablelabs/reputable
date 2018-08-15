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
const supply = (supply = 0, action) => {
    const map = {
        [constants_1.DEPLOY_TOKEN]: () => action.payload.supply,
        [constants_1.RESET_TOKEN]: () => 0,
    };
    return map[action.type] ? map[action.type]() : supply;
};
exports.default = redux_1.combineReducers({
    address,
    supply,
});
