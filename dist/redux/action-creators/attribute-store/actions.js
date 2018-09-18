"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ATTRIBUTE_STORE_RESET = 'ATTRIBUTE_STORE_RESET';
exports.ATTRIBUTE_STORE_DEPLOY_REQUEST = 'ATTRIBUTE_STORE_DEPLOY_REQUEST';
exports.ATTRIBUTE_STORE_DEPLOY_OK = 'ATTRIBUTE_STORE_DEPLOY_OK';
exports.ATTRIBUTE_STORE_DEPLOY_ERROR = 'ATTRIBUTE_STORE_DEPLOY_ERROR';
exports.ATTRIBUTE_STORE_ADDRESS_OK = 'ATTRIBUTE_STORE_ADDRESS_OK';
exports.ATTRIBUTE_STORE_ADDRESS_RESET = 'ATTRIBUTE_STORE_ADDRESS_RESET';
exports.attributeStoreReset = () => ({
    type: exports.ATTRIBUTE_STORE_RESET,
    payload: {},
});
exports.attributeStoreDeployRequest = (value) => ({
    type: exports.ATTRIBUTE_STORE_DEPLOY_REQUEST,
    payload: value,
});
exports.attributeStoreDeployOk = (value) => ({
    type: exports.ATTRIBUTE_STORE_DEPLOY_OK,
    payload: value,
});
exports.attributeStoreDeployError = (value) => ({
    type: exports.ATTRIBUTE_STORE_DEPLOY_ERROR,
    payload: value,
});
exports.attributeStoreAddressOk = (value) => ({
    type: exports.ATTRIBUTE_STORE_ADDRESS_OK,
    payload: value,
});
exports.attributeStoreAddressReset = () => ({
    type: exports.ATTRIBUTE_STORE_ADDRESS_RESET,
    payload: {},
});
