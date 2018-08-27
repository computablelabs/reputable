"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = __importDefault(require("../store"));
const voting_1 = require("../action-creators/voting");
const resetVoting = () => {
    store_1.default.dispatch(voting_1.resetVotingAddress());
};
exports.resetVoting = resetVoting;
