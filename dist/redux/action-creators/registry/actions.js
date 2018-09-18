"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REGISTRY_RESET = 'REGISTRY_RESET';
exports.REGISTRY_DEPLOY_REQUEST = 'REGISTRY_DEPLOY_REQUEST';
exports.REGISTRY_DEPLOY_OK = 'REGISTRY_DEPLOY_OK';
exports.REGISTRY_DEPLOY_ERROR = 'REGISTRY_DEPLOY_ERROR';
exports.REGISTRY_ADDRESS_OK = 'REGISTRY_ADDRESS_OK';
exports.REGISTRY_ADDRESS_RESET = 'REGISTRY_ADDRESS_RESET';
exports.REGISTRY_LISTING_REQUEST = 'REGISTRY_LISTING_REQUEST';
exports.REGISTRY_LISTING_OK = 'REGISTRY_LISTING_OK';
exports.REGISTRY_LISTING_REMOVE = 'REGISTRY_LISTING_REMOVE';
exports.REGISTRY_LISTING_ERROR = 'REGISTRY_LISTING_ERROR';
exports.REGISTRY_LISTING_RESET = 'REGISTRY_LISTING_RESET';
exports.REGISTRY_APPLY_REQUEST = 'REGISTRY_APPLY_REQUEST';
exports.REGISTRY_APPLY_OK = 'REGISTRY_APPLY_OK';
exports.REGISTRY_APPLY_ERROR = 'REGISTRY_APPLY_ERROR';
exports.REGISTRY_CHALLENGE_REQUEST = 'REGISTRY_CHALLENGE_REQUEST';
exports.REGISTRY_CHALLENGE_OK = 'REGISTRY_CHALLENGE_OK';
exports.REGISTRY_CHALLENGE_ERROR = 'REGISTRY_CHALLENGE_ERROR';
exports.REGISTRY_CHALLENGE_RESET = 'REGISTRY_CHALLENGE_RESET';
exports.registryReset = () => ({
    type: exports.REGISTRY_RESET,
    payload: {},
});
exports.registryDeployRequest = (value) => ({
    type: exports.REGISTRY_DEPLOY_REQUEST,
    payload: value,
});
exports.registryDeployOk = (value) => ({
    type: exports.REGISTRY_DEPLOY_OK,
    payload: value
});
exports.registryDeployError = (value) => ({
    type: exports.REGISTRY_DEPLOY_ERROR,
    payload: value,
});
exports.registryAddressOk = (value) => ({
    type: exports.REGISTRY_ADDRESS_OK,
    payload: value,
});
exports.registryAddressReset = () => ({
    type: exports.REGISTRY_ADDRESS_RESET,
    payload: {},
});
exports.registryListingRequest = (value) => ({
    type: exports.REGISTRY_LISTING_REQUEST,
    payload: value,
});
exports.registryListingOk = (value) => ({
    type: exports.REGISTRY_LISTING_OK,
    payload: value,
});
exports.registryListingRemove = (value) => ({
    type: exports.REGISTRY_LISTING_REMOVE,
    payload: value,
});
exports.registryListingError = (value) => ({
    type: exports.REGISTRY_LISTING_ERROR,
    payload: value,
});
exports.registryListingReset = () => ({
    type: exports.REGISTRY_LISTING_RESET,
    payload: {},
});
exports.registryApplyRequest = (value) => ({
    type: exports.REGISTRY_APPLY_REQUEST,
    payload: value,
});
exports.registryApplyOk = (value) => ({
    type: exports.REGISTRY_APPLY_OK,
    payload: value,
});
exports.registryApplyError = (value) => ({
    type: exports.REGISTRY_APPLY_ERROR,
    payload: value,
});
exports.registryChallengeRequest = (value) => ({
    type: exports.REGISTRY_CHALLENGE_REQUEST,
    payload: value,
});
exports.registryChallengeOk = (value) => ({
    type: exports.REGISTRY_CHALLENGE_OK,
    payload: value,
});
exports.registryChallengeError = (value) => ({
    type: exports.REGISTRY_CHALLENGE_ERROR,
    payload: value,
});
exports.registryChallengeReset = () => ({
    type: exports.REGISTRY_CHALLENGE_RESET,
    payload: {},
});
