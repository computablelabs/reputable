"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const ipfs_1 = require("../helpers/ipfs");
const encryption_1 = require("../helpers/encryption");
const encodeData = (applicantData) => __awaiter(this, void 0, void 0, function* () {
    let value = yield encryption_1.encrypt(applicantData.value);
    if (applicantData.source === constants_1.DataSources.IPFS) {
        const cid = yield ipfs_1.IPFSWrite(value);
        value = cid;
    }
    const encodedData = Object.assign({}, applicantData, { value });
    return JSON.stringify(encodedData);
});
exports.encodeData = encodeData;
const decodeData = (data) => __awaiter(this, void 0, void 0, function* () {
    const parsedData = JSON.parse(data);
    let value;
    if (parsedData.source === constants_1.DataSources.IPFS) {
        const ipfsData = yield ipfs_1.IPFSRead(parsedData.value);
        value = ipfsData;
    }
    else {
        value = parsedData.value;
    }
    const decryptedValue = yield encryption_1.decrypt(value);
    const decodedData = Object.assign({}, parsedData, { value: decryptedValue });
    return decodedData;
});
exports.decodeData = decodeData;
