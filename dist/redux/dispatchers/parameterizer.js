"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = __importDefault(require("../store"));
const parameterizer_1 = require("../action-creators/parameterizer");
const resetParameterizer = () => {
    store_1.default.dispatch(parameterizer_1.resetParameterizerAddress());
};
exports.resetParameterizer = resetParameterizer;
