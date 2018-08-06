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
const parameterizer_1 = require("../action-creators/parameterizer");
const deployParameterizer = (address, opts) => __awaiter(this, void 0, void 0, function* () { return store_1.default.dispatch(parameterizer_1.deployParameterizer(address, opts)); });
exports.deployParameterizer = deployParameterizer;
const resetParameterizer = () => {
    store_1.default.dispatch(parameterizer_1.resetParameterizer());
};
exports.resetParameterizer = resetParameterizer;
