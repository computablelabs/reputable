"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = __importDefault(require("../store"));
const token_1 = require("../action-creators/token");
const approve = (address, amount, from) => __awaiter(this, void 0, void 0, function* () { return store_1.default.dispatch(token_1.approve(address, amount, from)); });
exports.approve = approve;
const transfer = (to, amount, from) => __awaiter(this, void 0, void 0, function* () { return store_1.default.dispatch(token_1.transfer(to, amount, from)); });
exports.transfer = transfer;
const deployToken = (address, supply) => __awaiter(this, void 0, void 0, function* () { return store_1.default.dispatch(token_1.deployToken(address, supply)); });
exports.deployToken = deployToken;
const resetToken = () => {
    store_1.default.dispatch(token_1.resetToken());
};
exports.resetToken = resetToken;
