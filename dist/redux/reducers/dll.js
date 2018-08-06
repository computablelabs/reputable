"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants");
const dllAddress = (address = '', action) => {
    if (action.type === constants_1.DEPLOYED_DLL)
        return action.payload.address;
    if (action.type === constants_1.RESET_DLL)
        return '';
    return address;
};
exports.default = dllAddress;
