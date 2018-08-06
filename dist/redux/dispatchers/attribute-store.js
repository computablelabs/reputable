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
const attribute_store_1 = require("../action-creators/attribute-store");
const deployAttributeStore = (address) => __awaiter(this, void 0, void 0, function* () { return store_1.default.dispatch(attribute_store_1.deployAttributeStore(address)); });
exports.deployAttributeStore = deployAttributeStore;
const resetAttributeStore = () => {
    store_1.default.dispatch(attribute_store_1.resetAttributeStore());
};
exports.resetAttributeStore = resetAttributeStore;
