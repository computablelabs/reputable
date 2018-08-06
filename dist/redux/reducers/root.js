"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const web3_1 = __importDefault(require("./web3"));
const participant_1 = __importDefault(require("./participant"));
const token_1 = __importDefault(require("./token"));
const dll_1 = __importDefault(require("./dll"));
const attribute_store_1 = __importDefault(require("./attribute-store"));
const voting_1 = __importDefault(require("./voting"));
const parameterizer_1 = __importDefault(require("./parameterizer"));
const registry_1 = __importDefault(require("./registry"));
// TODO it appears that upcoming versions of redux typings will make the cast to 'any' not needed...
exports.default = redux_1.combineReducers({
    websocketAddress: web3_1.default,
    participants: participant_1.default,
    token: token_1.default,
    dllAddress: dll_1.default,
    attributeStoreAddress: attribute_store_1.default,
    voting: voting_1.default,
    parameterizer: parameterizer_1.default,
    registry: registry_1.default,
});
