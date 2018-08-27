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
const helpers_1 = require("computable/dist/helpers");
const constants_1 = require("../../../constants");
const selectors_1 = require("../../selectors");
const initializers_1 = require("../../../initializers");
exports.DLL_REQUEST = 'DLL_REQUEST';
exports.DLL_OK = 'DLL_OK';
exports.DLL_ERROR = 'DLL_ERROR';
exports.DLL_RESET = 'DLL_RESET';
const dllRequest = (value) => ({
    type: exports.DLL_REQUEST,
    payload: value,
});
const dllOk = (value) => ({
    type: exports.DLL_OK,
    payload: value,
});
const dllError = (value) => ({
    type: exports.DLL_ERROR,
    payload: value,
});
const dllReset = () => ({
    type: exports.DLL_RESET,
    payload: {},
});
const deployDll = () => (dispatch, getState) => __awaiter(this, void 0, void 0, function* () {
    const state = getState();
    const args = {};
    dispatch(dllRequest(args));
    try {
        const owner = selectors_1.getOwner(state);
        if (!owner) {
            throw new Error(constants_1.Errors.NO_ADMIN_FOUND);
        }
        const websocketAddress = selectors_1.getWebsocketAddress(state);
        if (!websocketAddress) {
            throw new Error(constants_1.Errors.NO_WEBSOCKETADDRESS_FOUND);
        }
        const web3 = yield initializers_1.getWeb3(websocketAddress);
        const contract = yield helpers_1.deployDll(web3, owner.address);
        const contractAddress = contract.options.address;
        dispatch(dllOk({ address: contractAddress }));
        return contractAddress;
    }
    catch (err) {
        dispatch(dllError(err));
        return '';
    }
});
exports.deployDll = deployDll;
const resetDll = () => ((dispatch) => __awaiter(this, void 0, void 0, function* () {
    return (dispatch(dllReset()));
}));
exports.resetDll = resetDll;
