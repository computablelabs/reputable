"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants");
const attributeStoreAddress = (address = '', action) => {
    if (action.type === constants_1.DEPLOYED_ATTRIBUTE_STORE)
        return action.payload.address;
    if (action.type === constants_1.RESET_ATTRIBUTE_STORE)
        return '';
    return address;
};
exports.default = attributeStoreAddress;
