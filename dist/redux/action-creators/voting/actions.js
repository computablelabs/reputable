"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VOTING_RESET = 'VOTING_RESET';
exports.VOTING_DEPLOY_REQUEST = 'VOTING_DEPLOY_REQUEST';
exports.VOTING_DEPLOY_OK = 'VOTING_DEPLOY_OK';
exports.VOTING_DEPLOY_ERROR = 'VOTING_DEPLOY_ERROR';
exports.VOTING_ADDRESS_OK = 'VOTING_DEPLOY_ADDRESS_OK';
exports.VOTING_ADDRESS_RESET = 'VOTING_DEPLOY_ADDRESS_RESET';
exports.VOTING_VOTE_REQUEST = 'VOTING_VOTE_REQUEST';
exports.VOTING_VOTE_OK = 'VOTING_VOTE_OK';
exports.VOTING_VOTE_ERROR = 'VOTING_VOTE_ERROR';
exports.votingReset = () => ({
    type: exports.VOTING_RESET,
    payload: {},
});
exports.votingDeployRequest = (value) => ({
    type: exports.VOTING_DEPLOY_REQUEST,
    payload: value,
});
exports.votingDeployOk = (value) => ({
    type: exports.VOTING_DEPLOY_OK,
    payload: value,
});
exports.votingDeployError = (value) => ({
    type: exports.VOTING_DEPLOY_ERROR,
    payload: value,
});
exports.votingAddressOk = (value) => ({
    type: exports.VOTING_ADDRESS_OK,
    payload: value,
});
exports.votingAddressReset = () => ({
    type: exports.VOTING_ADDRESS_RESET,
    payload: {},
});
exports.votingVoteRequest = (value) => ({
    type: exports.VOTING_VOTE_REQUEST,
    payload: value,
});
exports.votingVoteOk = (value) => ({
    type: exports.VOTING_VOTE_OK,
    payload: value,
});
exports.votingVoteError = (value) => ({
    type: exports.VOTING_VOTE_ERROR,
    payload: value,
});
