"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = __importDefault(require("../store"));
const registry_1 = require("../action-creators/registry");
const resetRegistry = () => {
    store_1.default.dispatch(registry_1.resetRegistryAddress());
    store_1.default.dispatch(registry_1.resetRegistryListings());
};
exports.resetRegistry = resetRegistry;
