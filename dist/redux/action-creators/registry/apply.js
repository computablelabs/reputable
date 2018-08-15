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
const registry_1 = __importDefault(require("computable/dist/contracts/registry"));
const helpers_1 = require("computable/dist/helpers");
const selectors_1 = require("../../selectors");
// Action Types
exports.REGISTRY_APPLY_REQUEST = 'REGISTRY_APPLY_REQUEST';
exports.REGISTRY_APPLY_OK = 'REGISTRY_APPLY_OK';
exports.REGISTRY_APPLY_ERROR = 'REGISTRY_APPLY_ERROR';
exports.REGISTRY_APPLY_RESET = 'REGISTRY_APPLY_RESET';
// Actions
const registryApplyRequest = (value) => ({
    type: exports.REGISTRY_APPLY_REQUEST,
    payload: value,
});
const registryApplyOk = (value) => ({
    type: exports.REGISTRY_APPLY_OK,
    payload: value,
});
const registryApplyError = (value) => ({
    type: exports.REGISTRY_APPLY_ERROR,
    payload: value,
});
const registryApplyReset = () => ({
    type: exports.REGISTRY_APPLY_RESET,
    payload: {},
});
// Action Creators
const apply = (registryAddress, listing, userAddress, deposit, data) => (dispatch, getState) => __awaiter(this, void 0, void 0, function* () {
    const state = getState();
    const owner = selectors_1.getOwner(state);
    const registryAddress = selectors_1.getRegistryAddress(state);
    const websocketAddress = state.websocketAddress || '';
    const web3Provider = new web3_1.default.providers.WebsocketProvider(websocketAddress);
    const web3 = new web3_1.default(web3Provider);
    const registry = new registry_1.default(owner.address);
    registryAddress && (yield registry.at(web3, { address: registryAddress }));
    const encodedListing = web3.utils.toHex(listing);
    const args = { registryAddress, listing, userAddress, deposit, data };
    // dispatch that a request has been initialized
    dispatch(registryApplyRequest(args));
    try {
        const emitter = registry.getEventEmitter('_Application');
        registry.apply(encodedListing, deposit, data, { from: userAddress });
        const eventLog = yield helpers_1.onData(emitter);
        const eventValues = eventLog.returnValues;
        const out = {
            applicant: eventValues.applicant,
            deposit: eventValues.deposit,
            appEndDate: eventValues.appEndDate,
            listing: web3.utils.hexToUtf8(eventValues.listingHash),
        };
        dispatch(registryApplyOk(out));
        return out;
    }
    catch (err) {
        dispatch(registryApplyError(err));
        return undefined;
    }
});
exports.apply = apply;
const resetRegistryApply = () => registryApplyReset();
exports.resetRegistryApply = resetRegistryApply;
