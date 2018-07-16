"use strict";
/**
 * Bound action creators for participant state
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = __importDefault(require("../store"));
const participant_1 = require("../action-creators/participant");
const participate = (name, address) => {
    store_1.default.dispatch(participant_1.participate(name, address));
};
exports.participate = participate;
const resetParticipants = () => {
    store_1.default.dispatch(participant_1.resetParticipants());
};
exports.resetParticipants = resetParticipants;
