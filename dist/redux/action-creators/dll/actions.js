"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DLL_RESET = 'DLL_RESET';
exports.DLL_DEPLOY_REQUEST = 'DLL_DEPLOY_REQUEST';
exports.DLL_DEPLOY_OK = 'DLL_DEPLOY_OK';
exports.DLL_DEPLOY_ERROR = 'DLL_DEPLOY_ERROR';
exports.DLL_ADDRESS_OK = 'DLL_ADDRESS_OK';
exports.DLL_ADDRESS_RESET = 'DLL_ADDRESS_RESET';
exports.dllReset = () => ({
    type: exports.DLL_RESET,
    payload: {},
});
exports.dllDeployRequest = (value) => ({
    type: exports.DLL_DEPLOY_REQUEST,
    payload: value,
});
exports.dllDeployOk = (value) => ({
    type: exports.DLL_DEPLOY_OK,
    payload: value,
});
exports.dllDeployError = (value) => ({
    type: exports.DLL_DEPLOY_ERROR,
    payload: value,
});
exports.dllAddressOk = (value) => ({
    type: exports.DLL_ADDRESS_OK,
    payload: value,
});
exports.dllAddressReset = () => ({
    type: exports.DLL_ADDRESS_RESET,
    payload: {},
});
