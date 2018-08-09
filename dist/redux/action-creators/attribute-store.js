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
const web3_1 = __importDefault(require("web3"));
const helpers_1 = require("computable/dist/helpers");
const constants_1 = require("../../constants");
const selectors_1 = require("../selectors");
// Action Types
exports.ATTRIBUTE_STORE_REQUEST = 'ATTRIBUTE_STORE_REQUEST';
exports.ATTRIBUTE_STORE_OK = 'ATTRIBUTE_STORE_OK';
exports.ATTRIBUTE_STORE_ERROR = 'ATTRIBUTE_STORE_ERROR';
exports.ATTRIBUTE_STORE_RESET = 'ATTRIBUTE_STORE_RESET';
// Actions
const attributeStoreRequest = (value) => ({
    type: exports.ATTRIBUTE_STORE_REQUEST,
    payload: value,
});
const attributeStoreOk = (value) => ({
    type: exports.ATTRIBUTE_STORE_OK,
    payload: value,
});
const attributeStoreError = (value) => ({
    type: exports.ATTRIBUTE_STORE_ERROR,
    payload: value,
});
const attributeStoreReset = () => ({
    type: exports.ATTRIBUTE_STORE_RESET,
    payload: {},
});
// Action Creators
/**
 * It is debateable how useful the full range of actions are for deploying the two
 * voting contract dependencies (dll, attrStore). That being said, I'm just being consistent so...
 *
 * Note that there is no Higher Order Contract for them, but a helper for each
 */
const deployAttributeStore = (address = '') => (dispatch, getState) => __awaiter(this, void 0, void 0, function* () {
    const state = getState();
    const owner = selectors_1.getOwner(state);
    const { websocketAddress } = state;
    dispatch(attributeStoreRequest({ address }));
    if (!websocketAddress) {
        const error = new Error(constants_1.Errors.NO_WEBSOCKETADDRESS_FOUND);
        dispatch(attributeStoreError(error));
        return '';
    }
    if (!owner) {
        const error = new Error(constants_1.Errors.NO_ADMIN_FOUND);
        dispatch(attributeStoreError(error));
        return '';
    }
    const web3Provider = new web3_1.default.providers.WebsocketProvider(websocketAddress);
    const web3 = new web3_1.default(web3Provider);
    try {
        // note that the computable deploy helpers return the actual contract
        const store = yield helpers_1.deployAttributeStore(web3, address || owner.address);
        // any raw web3.eth.Contract will have its address @ contract.options.address
        const storeAddress = store.options.address;
        dispatch(attributeStoreOk({ address: storeAddress }));
        return storeAddress;
    }
    catch (err) {
        dispatch(attributeStoreError(err));
        return '';
    }
});
exports.deployAttributeStore = deployAttributeStore;
const resetAttributeStore = () => attributeStoreReset();
exports.resetAttributeStore = resetAttributeStore;
