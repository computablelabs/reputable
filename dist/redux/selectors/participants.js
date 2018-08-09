"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = __importDefault(require("./helpers"));
const model = 'participants';
const getParticipants = (state, { ids } = {}) => helpers_1.default.getList({ state, model, ids });
exports.getParticipants = getParticipants;
const getParticipant = (state, key) => helpers_1.default.getItem({ state, model, key });
exports.getParticipant = getParticipant;
const getOwner = (state) => {
    const predicate = (item) => item.owner;
    return helpers_1.default.getList({ state, model, predicate })[0];
};
exports.getOwner = getOwner;
