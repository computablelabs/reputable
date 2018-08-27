"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = __importDefault(require("../store"));
const token_1 = require("../action-creators/token");
const resetToken = () => {
    store_1.default.dispatch(token_1.resetTokenAddress());
    store_1.default.dispatch(token_1.resetTokenApprove());
    store_1.default.dispatch(token_1.resetTokenTransfer());
};
exports.resetToken = resetToken;
