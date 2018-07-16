"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const redux_thunk_1 = __importDefault(require("redux-thunk"));
const root_1 = __importDefault(require("./reducers/root"));
exports.default = redux_1.createStore(root_1.default, redux_1.applyMiddleware(redux_thunk_1.default));
