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
const crypto_1 = __importDefault(require("crypto"));
const ENCRYPTION_KEY = '12345678901234567890123456789012';
const IV_LENGTH = 16;
const ENCRYPTION_TYPE = 'aes-256-cbc';
const encrypt = (value) => __awaiter(this, void 0, void 0, function* () {
    const iv = crypto_1.default.randomBytes(IV_LENGTH);
    const encryptionKey = new Buffer(ENCRYPTION_KEY);
    const cipher = crypto_1.default.createCipheriv(ENCRYPTION_TYPE, encryptionKey, iv);
    const encrypted = cipher.update(value);
    const encryptedBuffer = Buffer.concat([encrypted, cipher.final()]);
    return `${iv.toString('hex')}:${encryptedBuffer.toString('hex')}`;
});
exports.encrypt = encrypt;
const decrypt = (value) => __awaiter(this, void 0, void 0, function* () {
    const valueTokens = value.split(':');
    let iv = new Buffer(valueTokens.shift() || '', 'hex');
    let encryptedText = new Buffer(valueTokens.join(':'), 'hex');
    const encryptionKey = new Buffer(ENCRYPTION_KEY);
    let decipher = crypto_1.default.createDecipheriv(ENCRYPTION_TYPE, encryptionKey, iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
});
exports.decrypt = decrypt;
