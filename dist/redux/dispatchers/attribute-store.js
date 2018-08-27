"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = __importDefault(require("../store"));
const attribute_store_1 = require("../action-creators/attribute-store");
const resetAttributeStore = () => {
    store_1.default.dispatch(attribute_store_1.resetAttributeStore());
};
exports.resetAttributeStore = resetAttributeStore;
