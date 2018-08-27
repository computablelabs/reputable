"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model = 'voting';
const getVoting = (state = {}) => {
    const stateItem = state[model];
    if (!stateItem) {
        return undefined;
    }
    return stateItem.data;
};
exports.getVoting = getVoting;
const getVotingAddress = (state = {}) => {
    const voting = getVoting(state);
    if (!voting) {
        return '';
    }
    return voting.address;
};
exports.getVotingAddress = getVotingAddress;
