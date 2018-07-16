"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants");
const websocketAddress = (state = '', action) => {
    const map = {
        [constants_1.WEBSOCKET_ADDRESS_SET]: () => action.payload.websocketAddress,
        [constants_1.RESET_WEBSOCKET_ADDRESS]: () => '',
    };
    // @ts-ignore:7017
    return map[action.type] ? map[action.type]() : state;
};
exports.default = websocketAddress;
