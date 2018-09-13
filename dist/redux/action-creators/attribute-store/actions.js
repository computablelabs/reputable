"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ATTRIBUTE_STORE_REQUEST = 'ATTRIBUTE_STORE_REQUEST';
exports.ATTRIBUTE_STORE_OK = 'ATTRIBUTE_STORE_OK';
exports.ATTRIBUTE_STORE_ERROR = 'ATTRIBUTE_STORE_ERROR';
exports.ATTRIBUTE_STORE_RESET = 'ATTRIBUTE_STORE_RESET';
exports.attributeStoreRequest = (value) => ({
    type: exports.ATTRIBUTE_STORE_REQUEST,
    payload: value,
});
exports.attributeStoreOk = (value) => ({
    type: exports.ATTRIBUTE_STORE_OK,
    payload: value,
});
exports.attributeStoreError = (value) => ({
    type: exports.ATTRIBUTE_STORE_ERROR,
    payload: value,
});
exports.attributeStoreReset = () => ({
    type: exports.ATTRIBUTE_STORE_RESET,
    payload: {},
});
