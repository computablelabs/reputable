"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = __importDefault(require("../store"));
const registry_1 = require("../action-creators/registry");
const apply = (name, deposit, data) => {
    // TODO default for deposit? App needs/has parameterizer defaults?
    store_1.default.dispatch(registry_1.apply(name, deposit || 0, data)); // this should move an application into the applicants list
};
exports.apply = apply;
