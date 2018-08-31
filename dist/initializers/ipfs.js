"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ipfs_api_1 = __importDefault(require("ipfs-api"));
const config = {
    ipfs: {
        domain: 'localhost',
        port: '5001',
        protocol: 'http',
    },
};
const ipfs = ipfs_api_1.default(config.ipfs.domain, config.ipfs.port, {
    protocol: config.ipfs.protocol,
});
exports.default = ipfs;
