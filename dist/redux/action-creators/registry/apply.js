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
const registry_1 = __importDefault(require("computable/dist/contracts/registry"));
const helpers_1 = require("computable/dist/helpers");
const constants_1 = require("../../../constants");
const initializers_1 = require("../../../initializers");
const selectors_1 = require("../../selectors");
exports.REGISTRY_APPLY_REQUEST = 'REGISTRY_APPLY_REQUEST';
exports.REGISTRY_APPLY_OK = 'REGISTRY_APPLY_OK';
exports.REGISTRY_APPLY_ERROR = 'REGISTRY_APPLY_ERROR';
exports.REGISTRY_APPLY_RESET = 'REGISTRY_APPLY_RESET';
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
const apply = ({ listing, userAddress, deposit, data, }) => ((dispatch, getState) => __awaiter(this, void 0, void 0, function* () {
    const state = getState();
    const args = { listing, userAddress, deposit, data };
    dispatch(registryApplyRequest(args));
    try {
        const owner = selectors_1.getOwner(state);
        if (!owner) {
            throw new Error(constants_1.Errors.NO_ADMIN_FOUND);
        }
        const websocketAddress = selectors_1.getWebsocketAddress(state);
        if (!websocketAddress) {
            throw new Error(constants_1.Errors.NO_WEBSOCKETADDRESS_FOUND);
        }
        const web3 = yield initializers_1.getWeb3(websocketAddress);
        const contractAddress = selectors_1.getRegistryAddress(state);
        if (!contractAddress) {
            throw new Error(constants_1.Errors.NO_REGISTRY_FOUND);
        }
        const registry = new registry_1.default(owner.address);
        yield registry.at(web3, { address: contractAddress });
        const emitter = registry.getEventEmitter('_Application');
        const encodedListing = web3.utils.toHex(listing);
        registry.apply(encodedListing, deposit, data, { from: userAddress });
        const eventLog = yield helpers_1.onData(emitter);
        const eventValues = eventLog.returnValues;
        const out = {
            listing: web3.utils.hexToUtf8(eventValues.listingHash),
            applicationExpiry: eventValues.appEndDate,
            owner: eventValues.applicant,
            unstakedDeposit: eventValues.deposit,
            data: eventValues.data,
        };
        dispatch(registryApplyOk(out));
        return out;
    }
    catch (err) {
        dispatch(registryApplyError(err));
        return undefined;
    }
}));
exports.apply = apply;
const resetRegistryApply = () => ((dispatch) => __awaiter(this, void 0, void 0, function* () {
    return (dispatch(registryApplyReset()));
}));
exports.resetRegistryApply = resetRegistryApply;
