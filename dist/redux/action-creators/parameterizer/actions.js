"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PARAMETERIZER_DEPLOY_REQUEST = 'PARAMETERIZER_DEPLOY_REQUEST';
exports.PARAMETERIZER_DEPLOY_OK = 'PARAMETERIZER_DEPLOY_OK';
exports.PARAMETERIZER_DEPLOY_ERROR = 'PARAMETERIZER_DEPLOY_ERROR';
exports.PARAMETERIZER_ADDRESS_OK = 'PARAMETERIZER_ADDRESS_OK';
exports.PARAMETERIZER_ADDRESS_RESET = 'PARAMETERIZER_ADDRESS_RESET';
exports.parameterizerDeployRequest = (value) => ({
    type: exports.PARAMETERIZER_DEPLOY_REQUEST,
    payload: value,
});
exports.parameterizerDeployOk = (value) => ({
    type: exports.PARAMETERIZER_DEPLOY_OK,
    payload: value,
});
exports.parameterizerDeployError = (value) => ({
    type: exports.PARAMETERIZER_DEPLOY_ERROR,
    payload: value,
});
exports.parameterizerAddressOk = (value) => ({
    type: exports.PARAMETERIZER_ADDRESS_OK,
    payload: value,
});
exports.parameterizerAddressReset = () => ({
    type: exports.PARAMETERIZER_ADDRESS_RESET,
    payload: {},
});
