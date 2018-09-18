"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PARTICIPANTS_OK = 'PARTICIPANTS_OK';
exports.PARTICIPANTS_RESET = 'PARTICIPANTS_RESET';
exports.participantsOk = (value) => ({
    type: exports.PARTICIPANTS_OK,
    payload: value,
});
exports.participantsReset = () => ({
    type: exports.PARTICIPANTS_RESET,
    payload: {},
});
