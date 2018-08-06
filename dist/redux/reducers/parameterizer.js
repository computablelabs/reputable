"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const constants_1 = require("../../constants");
const address = (address = '', action) => {
    if (action.type === constants_1.DEPLOYED_PARAMETERIZER)
        return action.payload.address;
    if (action.type === constants_1.RESET_PARAMETERIZER)
        return '';
    return address;
};
// TODO reducers for the locally retained p11r attributes (whatever they may be)
exports.default = redux_1.combineReducers({
    address,
});
