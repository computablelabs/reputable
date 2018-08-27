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
const constants_1 = require("../../../constants");
const initializers_1 = require("../../../initializers");
const selectors_1 = require("../../selectors");
exports.REGISTRY_DEPLOY_REQUEST = 'REGISTRY_DEPLOY_REQUEST';
exports.REGISTRY_DEPLOY_OK = 'REGISTRY_DEPLOY_OK';
exports.REGISTRY_DEPLOY_ERROR = 'REGISTRY_DEPLOY_ERROR';
exports.REGISTRY_ADDRESS_OK = 'REGISTRY_ADDRESS_OK';
exports.REGISTRY_ADDRESS_RESET = 'REGISTRY_ADDRESS_RESET';
const registryDeployRequest = (value) => ({
    type: exports.REGISTRY_DEPLOY_REQUEST,
    payload: value,
});
const registryDeployOk = (value) => ({
    type: exports.REGISTRY_DEPLOY_OK,
    payload: value
});
const registryDeployError = (value) => ({
    type: exports.REGISTRY_DEPLOY_ERROR,
    payload: value,
});
const registryAddressOk = (value) => ({
    type: exports.REGISTRY_ADDRESS_OK,
    payload: value,
});
const registryAddressReset = () => ({
    type: exports.REGISTRY_ADDRESS_RESET,
    payload: {},
});
const deployRegistry = (name) => ((dispatch, getState) => __awaiter(this, void 0, void 0, function* () {
    const state = getState();
    const args = { name };
    dispatch(registryDeployRequest(args));
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
        const tokenAddress = selectors_1.getTokenAddress(state);
        if (!tokenAddress) {
            throw new Error(constants_1.Errors.NO_TOKEN_FOUND);
        }
        const votingAddress = selectors_1.getVotingAddress(state);
        if (!votingAddress) {
            throw new Error(constants_1.Errors.NO_VOTING_FOUND);
        }
        const parameterizerAddress = selectors_1.getParameterizerAddress(state);
        if (!parameterizerAddress) {
            throw new Error(constants_1.Errors.NO_PARAMETERIZER_FOUND);
        }
        const contract = new registry_1.default(owner.address);
        const registryAddress = yield contract.deploy(web3, {
            name,
            tokenAddress,
            votingAddress,
            parameterizerAddress,
        });
        dispatch(registryDeployOk({ address: registryAddress }));
        return registryAddress;
    }
    catch (err) {
        dispatch(registryDeployError(err));
        return '';
    }
}));
exports.deployRegistry = deployRegistry;
const setRegistryAddress = (registryAddress) => ((dispatch) => __awaiter(this, void 0, void 0, function* () {
    return (dispatch(registryAddressOk({ address: registryAddress })));
}));
exports.setRegistryAddress = setRegistryAddress;
const resetRegistryAddress = () => ((dispatch) => __awaiter(this, void 0, void 0, function* () {
    return (dispatch(registryAddressReset()));
}));
exports.resetRegistryAddress = resetRegistryAddress;
