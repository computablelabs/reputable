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
const registry_1 = require("../action-creators/registry");
const selectors_1 = require("../selectors");
const apply = (listing, userAddress, deposit, data) => {
    const state = store_1.default.getState();
    const registryAddress = selectors_1.getRegistryAddress(state);
    // TODO default for deposit? App needs/has parameterizer defaults?
    // this should move an application into the applicants list
    return store_1.default.dispatch(registry_1.apply(registryAddress, listing, userAddress, deposit || 0, data));
};
exports.apply = apply;
const deployRegistry = (name, address) => __awaiter(this, void 0, void 0, function* () { return store_1.default.dispatch(registry_1.deployRegistry(name, address)); });
exports.deployRegistry = deployRegistry;
const resetRegistry = () => {
    store_1.default.dispatch(registry_1.resetRegistry());
};
exports.resetRegistry = resetRegistry;
