"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DLL_REQUEST = 'DLL_REQUEST';
exports.DLL_OK = 'DLL_OK';
exports.DLL_ERROR = 'DLL_ERROR';
exports.DLL_RESET = 'DLL_RESET';
exports.dllRequest = (value) => ({
    type: exports.DLL_REQUEST,
    payload: value,
});
exports.dllOk = (value) => ({
    type: exports.DLL_OK,
    payload: value,
});
exports.dllError = (value) => ({
    type: exports.DLL_ERROR,
    payload: value,
});
exports.dllReset = () => ({
    type: exports.DLL_RESET,
    payload: {},
});
