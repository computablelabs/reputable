"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model = 'participants';
const getParticipants = (state = {}) => {
    const stateItem = state[model];
    if (!stateItem) {
        return [];
    }
    return stateItem.data || [];
};
exports.getParticipants = getParticipants;
const getOwner = (state = {}) => {
    const participants = getParticipants(state);
    const owner = participants.find((participant) => !!participant.owner);
    return owner;
};
exports.getOwner = getOwner;
