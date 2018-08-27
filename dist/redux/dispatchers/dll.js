"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = __importDefault(require("../store"));
const dll_1 = require("../action-creators/dll");
const resetDll = () => {
    store_1.default.dispatch(dll_1.resetDll());
};
exports.resetDll = resetDll;
