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
const encryption_1 = require("./encryption");
describe('helpers/encryption', () => {
    describe('#encrypt', () => {
        it('encrypts string data', () => __awaiter(this, void 0, void 0, function* () {
            const data = JSON.stringify('string data');
            const encryptedData = yield encryption_1.encrypt(data);
            const tokens = encryptedData.split(':');
            expect(encryptedData).toBeTruthy();
            expect(tokens.length).toBe(2);
            expect(tokens[0].length).toBe(32);
            expect(tokens[1].length).toBe(64);
        }));
        it('encrypts map data', () => __awaiter(this, void 0, void 0, function* () {
            const data = { value: 'map data' };
            const encryptedData = yield encryption_1.encrypt(data);
            const tokens = encryptedData.split(':');
            expect(encryptedData).toBeTruthy();
            expect(tokens.length).toBe(2);
            expect(tokens[0].length).toBe(32);
            expect(tokens[1].length).toBe(64);
        }));
    });
    describe('#decrypt', () => {
        const stringData = 'string data';
        let encryptedStringData;
        const mapData = { value: 'map data' };
        let encryptedMapData;
        beforeEach(() => __awaiter(this, void 0, void 0, function* () {
            encryptedStringData = yield encryption_1.encrypt(stringData);
            encryptedMapData = yield encryption_1.encrypt(mapData);
        }));
        it('decrypts encrypted string data', () => __awaiter(this, void 0, void 0, function* () {
            const data = yield encryption_1.decrypt(encryptedStringData);
            expect(data).toEqual(stringData);
        }));
        it('decrypts encrypted map data', () => __awaiter(this, void 0, void 0, function* () {
            const data = yield encryption_1.decrypt(encryptedMapData);
            expect(data).toEqual(mapData);
        }));
    });
});
