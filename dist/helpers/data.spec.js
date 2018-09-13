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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ts_sinon_1 = __importDefault(require("ts-sinon"));
const constants_1 = require("../constants");
const IPFS = __importStar(require("./ipfs"));
const encryption = __importStar(require("./encryption"));
const data_1 = require("./data");
describe('helpers/data', () => {
    let encryptSpy;
    let encryptStub;
    let decryptSpy;
    let decryptStub;
    let writeStub;
    beforeAll(() => {
        encryptSpy = ts_sinon_1.default.spy((param) => param);
        encryptStub = ts_sinon_1.default.stub(encryption, 'encrypt').callsFake(encryptSpy);
        decryptSpy = ts_sinon_1.default.spy((param) => param);
        decryptStub = ts_sinon_1.default.stub(encryption, 'decrypt').callsFake(decryptSpy);
        writeStub = ts_sinon_1.default.stub(IPFS, 'IPFSWrite').returns('cid');
    });
    afterAll(() => {
        encryptStub.restore();
        decryptStub.restore();
        writeStub.restore();
    });
    afterEach(() => {
        encryptSpy.resetHistory();
        decryptSpy.resetHistory();
    });
    describe('#encodeData', () => {
        describe('on-chain data', () => {
            it('is properly encoded', () => __awaiter(this, void 0, void 0, function* () {
                const data = {
                    value: 'foo data',
                };
                const encodedData = yield data_1.encodeData(data);
                const parsedData = JSON.parse(encodedData);
                expect(encryptSpy.callCount).toEqual(1);
                expect(encryptSpy.args[0]).toEqual([data.value]);
                expect(parsedData.value).toEqual(data.value);
            }));
        });
        describe('IPFS data', () => {
            it('is properly encoded', () => __awaiter(this, void 0, void 0, function* () {
                const data = {
                    source: constants_1.DataSources.IPFS,
                    value: 'foo data',
                };
                const encodedData = yield data_1.encodeData(data);
                const parsedData = JSON.parse(encodedData);
                expect(encryptSpy.callCount).toEqual(1);
                expect(encryptSpy.args[0]).toEqual([data.value]);
                expect(parsedData.value).toEqual('cid');
            }));
        });
    });
    describe('#decodeData', () => {
        describe('on-chain data', () => {
            const data = {
                value: 'foo data',
            };
            let encodedData;
            beforeEach(() => __awaiter(this, void 0, void 0, function* () {
                encodedData = yield data_1.encodeData(data);
            }));
            it('is properly decoded', () => __awaiter(this, void 0, void 0, function* () {
                const decodedData = yield data_1.decodeData(encodedData);
                expect(decryptSpy.callCount).toEqual(1);
                expect(decodedData).toEqual(data);
            }));
        });
        describe('IPFS data', () => {
            let readStub;
            const data = {
                source: constants_1.DataSources.IPFS,
                value: 'foo data',
            };
            let encodedData;
            beforeAll(() => {
                readStub = ts_sinon_1.default.stub(IPFS, 'IPFSRead').returns(data.value);
            });
            afterAll(() => {
                readStub.restore();
            });
            beforeEach(() => __awaiter(this, void 0, void 0, function* () {
                encodedData = yield data_1.encodeData(data);
            }));
            it('is properly decoded', () => __awaiter(this, void 0, void 0, function* () {
                const decodedData = yield data_1.decodeData(encodedData);
                expect(decryptSpy.callCount).toEqual(1);
                expect(decryptSpy.args[0]).toEqual([data.value]);
                expect(decodedData).toEqual(data);
            }));
        });
    });
});
