"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WEBSOCKET_ADDRESS_SET = 'WEBSOCKET_ADDRESS_SET';
exports.RESET_WEBSOCKET_ADDRESS = 'RESET_WEBSOCKET_ADDRESS';
exports.websocketAddressOk = (value) => ({
    type: exports.WEBSOCKET_ADDRESS_SET,
    payload: value,
});
exports.websocketAddressReset = () => ({
    type: exports.RESET_WEBSOCKET_ADDRESS,
    payload: {},
});
