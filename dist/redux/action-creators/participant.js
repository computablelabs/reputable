"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants");
const participate = (name, address) => {
    const payload = { name, address };
    return { type: constants_1.PARTICIPATE, payload };
};
exports.participate = participate;
const resetParticipants = () => ({ type: constants_1.RESET_PARTICIPANTS });
exports.resetParticipants = resetParticipants;
