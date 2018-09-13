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
const ipfs_1 = __importDefault(require("../initializers/ipfs"));
const IPFSWrite = (data) => __awaiter(this, void 0, void 0, function* () {
    const buffer = Buffer.from(data);
    const ipfsBlock = yield ipfs_1.default.block.put(buffer);
    const cid = ipfsBlock.cid.toBaseEncodedString();
    return cid;
});
exports.IPFSWrite = IPFSWrite;
const IPFSRead = (cid) => __awaiter(this, void 0, void 0, function* () {
    const block = yield ipfs_1.default.block.get(cid);
    const data = block.data.toString();
    return data;
});
exports.IPFSRead = IPFSRead;
