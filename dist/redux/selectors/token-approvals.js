"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = __importDefault(require("./helpers"));
const model = 'tokenApprovals';
const getApprovals = (state = {}, { ids } = {}) => helpers_1.default.getList({ state, model, ids });
exports.getApprovals = getApprovals;
const getApproval = (state = {}, key) => helpers_1.default.getItem({ state, model, key });
exports.getApproval = getApproval;
