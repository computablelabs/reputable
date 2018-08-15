"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = __importDefault(require("./helpers"));
const model = 'registryApplications';
const getApplications = (state = {}, { ids } = {}) => helpers_1.default.getList({ state, model, ids });
exports.getApplications = getApplications;
const getApplication = (state = {}, key) => helpers_1.default.getItem({ state, model, key });
exports.getApplication = getApplication;
