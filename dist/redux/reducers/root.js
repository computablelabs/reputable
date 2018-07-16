"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const participant_1 = __importDefault(require("./participant"));
const registry_1 = __importDefault(require("./registry"));
const token_1 = __importDefault(require("./token"));
const web3_1 = __importDefault(require("./web3"));
// TODO it appears that upcoming versions of redux typings will make the cast to 'any' not needed...
exports.default = redux_1.combineReducers({
    websocketAddress: web3_1.default,
    participants: participant_1.default,
    token: token_1.default,
    registry: registry_1.default,
});
