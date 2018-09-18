"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TOKEN_RESET = 'TOKEN_RESET';
exports.TOKEN_DEPLOY_REQUEST = 'TOKEN_DEPLOY_REQUEST';
exports.TOKEN_DEPLOY_OK = 'TOKEN_DEPLOY_OK';
exports.TOKEN_DEPLOY_ERROR = 'TOKEN_DEPLOY_ERROR';
exports.TOKEN_ADDRESS_OK = 'TOKEN_ADDRESS_OK';
exports.TOKEN_ADDRESS_RESET = 'TOKEN_ADDRESS_RESET';
exports.TOKEN_APPROVE_REQUEST = 'TOKEN_APPROVE_REQUEST';
exports.TOKEN_APPROVE_OK = 'TOKEN_APPROVE_OK';
exports.TOKEN_APPROVE_ERROR = 'TOKEN_APPROVE_ERROR';
exports.TOKEN_APPROVE_RESET = 'TOKEN_APPROVE_RESET';
exports.TOKEN_TRANSFER_REQUEST = 'TOKEN_TRANSFER_REQUEST';
exports.TOKEN_TRANSFER_OK = 'TOKEN_TRANSFER_OK';
exports.TOKEN_TRANSFER_ERROR = 'TOKEN_TRANSFER_ERROR';
exports.TOKEN_TRANSFER_RESET = 'TOKEN_TRANSFER_RESET';
exports.tokenReset = () => ({
    type: exports.TOKEN_RESET,
    payload: {},
});
exports.tokenDeployRequest = (value) => ({
    type: exports.TOKEN_DEPLOY_REQUEST,
    payload: value,
});
exports.tokenDeployOk = (value) => ({
    type: exports.TOKEN_DEPLOY_OK,
    payload: value,
});
exports.tokenDeployError = (value) => ({
    type: exports.TOKEN_DEPLOY_ERROR,
    payload: value,
});
exports.tokenAddressOk = (value) => ({
    type: exports.TOKEN_ADDRESS_OK,
    payload: value,
});
exports.tokenAddressReset = () => ({
    type: exports.TOKEN_ADDRESS_RESET,
    payload: {},
});
exports.tokenApproveRequest = (value) => ({
    type: exports.TOKEN_APPROVE_REQUEST,
    payload: value,
});
exports.tokenApproveOk = (value) => ({
    type: exports.TOKEN_APPROVE_OK,
    payload: value,
});
exports.tokenApproveError = (value) => ({
    type: exports.TOKEN_APPROVE_ERROR,
    payload: value,
});
exports.tokenApproveReset = () => ({
    type: exports.TOKEN_APPROVE_RESET,
    payload: {},
});
exports.tokenTransferRequest = (value) => ({
    type: exports.TOKEN_TRANSFER_REQUEST,
    payload: value,
});
exports.tokenTransferOk = (value) => ({
    type: exports.TOKEN_TRANSFER_OK,
    payload: value,
});
exports.tokenTransferError = (value) => ({
    type: exports.TOKEN_TRANSFER_ERROR,
    payload: value,
});
exports.tokenTransferReset = () => ({
    type: exports.TOKEN_TRANSFER_RESET,
    payload: {},
});
