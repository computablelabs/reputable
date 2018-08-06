"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Action Types
exports.PARTICIPANTS_OK = 'PARTICIPANTS_OK';
exports.PARTICIPANTS_RESET = 'PARTICIPANTS_RESET';
// Actions
const participantsOk = (value) => ({
    type: exports.PARTICIPANTS_OK,
    payload: value,
});
const participantsReset = () => ({
    type: exports.PARTICIPANTS_RESET,
    payload: {},
});
// Action Creators
const participate = (name, address) => participantsOk({ name, address });
exports.participate = participate;
const resetParticipants = () => participantsReset();
exports.resetParticipants = resetParticipants;
