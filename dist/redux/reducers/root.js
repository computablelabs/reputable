"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const attribute_store_1 = __importDefault(require("./attribute-store"));
const dll_1 = __importDefault(require("./dll"));
const parameterizer_1 = __importDefault(require("./parameterizer"));
const participant_1 = __importDefault(require("./participant"));
const registry_1 = __importDefault(require("./registry"));
const token_1 = __importDefault(require("./token"));
const voting_1 = __importDefault(require("./voting"));
const web3_1 = __importDefault(require("./web3"));
exports.default = redux_1.combineReducers({
    attributeStore: attribute_store_1.default,
    dll: dll_1.default,
    parameterizer: parameterizer_1.default,
    participants: participant_1.default,
    registry: registry_1.default,
    token: token_1.default,
    voting: voting_1.default,
    web3: web3_1.default,
});
