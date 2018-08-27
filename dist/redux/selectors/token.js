"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model = 'token';
const getToken = (state = {}) => {
    const stateItem = state[model];
    if (!stateItem) {
        return undefined;
    }
    return stateItem.data;
};
exports.getToken = getToken;
const getTokenAddress = (state = {}) => {
    const token = getToken(state);
    if (!token) {
        return '';
    }
    return token.address || '';
};
exports.getTokenAddress = getTokenAddress;
const getApprovals = (state = {}) => {
    const stateItem = state[model];
    if (!stateItem) {
        return [];
    }
    const data = stateItem.data;
    if (!data) {
        return [];
    }
    const approvals = data.approvals;
    if (!approvals) {
        return [];
    }
    return approvals;
};
exports.getApprovals = getApprovals;
const getTransfers = (state = {}, { ids } = {}) => {
    const stateItem = state[model];
    if (!stateItem) {
        return [];
    }
    const data = stateItem.data;
    if (!data) {
        return [];
    }
    const transfers = data.transfers;
    if (!transfers) {
        return [];
    }
    return transfers;
};
exports.getTransfers = getTransfers;
