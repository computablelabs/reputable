"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WEBSOCKET_ADDRESS_SET = 'WEBSOCKET_ADDRESS_SET';
exports.RESET_WEBSOCKET_ADDRESS = 'RESET_WEBSOCKET_ADDRESS';
const websocketAddressOk = (value) => ({
    type: exports.WEBSOCKET_ADDRESS_SET,
    payload: value,
});
const websocketAddressReset = () => ({
    type: exports.RESET_WEBSOCKET_ADDRESS,
    payload: {},
});
const setWebsocketAddress = (address) => ((dispatch) => __awaiter(this, void 0, void 0, function* () {
    return (dispatch(websocketAddressOk({ address })));
}));
exports.setWebsocketAddress = setWebsocketAddress;
const resetWebsocketAddress = () => ((dispatch) => __awaiter(this, void 0, void 0, function* () {
    return (dispatch(websocketAddressReset()));
}));
exports.resetWebsocketAddress = resetWebsocketAddress;
