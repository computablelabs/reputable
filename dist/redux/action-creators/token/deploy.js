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
const erc_20_1 = __importDefault(require("computable/dist/contracts/erc-20"));
const constants_1 = require("../../../constants");
const initializers_1 = require("../../../initializers");
const selectors_1 = require("../../selectors");
exports.TOKEN_DEPLOY_REQUEST = 'TOKEN_DEPLOY_REQUEST';
exports.TOKEN_DEPLOY_OK = 'TOKEN_DEPLOY_OK';
exports.TOKEN_DEPLOY_ERROR = 'TOKEN_DEPLOY_ERROR';
exports.TOKEN_ADDRESS_OK = 'TOKEN_ADDRESS_OK';
exports.TOKEN_ADDRESS_RESET = 'TOKEN_ADDRESS_RESET';
const tokenDeployRequest = (value) => ({
    type: exports.TOKEN_DEPLOY_REQUEST,
    payload: value,
});
const tokenDeployOk = (value) => ({
    type: exports.TOKEN_DEPLOY_OK,
    payload: value,
});
const tokenDeployError = (value) => ({
    type: exports.TOKEN_DEPLOY_ERROR,
    payload: value,
});
const tokenAddressOk = (value) => ({
    type: exports.TOKEN_ADDRESS_OK,
    payload: value,
});
const tokenAddressReset = () => ({
    type: exports.TOKEN_ADDRESS_RESET,
    payload: {},
});
const deployToken = (supply) => ((dispatch, getState) => __awaiter(this, void 0, void 0, function* () {
    const state = getState();
    const args = { address: undefined, supply };
    dispatch(tokenDeployRequest(args));
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
        const contract = new erc_20_1.default(owner.address);
        supply = supply || constants_1.TokenDefaults.SUPPLY;
        const tokenAddress = yield contract.deploy(web3, {
            address: owner.address,
            supply,
        });
        dispatch(tokenDeployOk({ address: tokenAddress, supply }));
        return tokenAddress;
    }
    catch (err) {
        dispatch(tokenDeployError(err));
        return '';
    }
}));
exports.deployToken = deployToken;
const setTokenAddress = (tokenAddress) => ((dispatch) => __awaiter(this, void 0, void 0, function* () {
    return (dispatch(tokenAddressOk({ address: tokenAddress })));
}));
exports.setTokenAddress = setTokenAddress;
const resetTokenAddress = () => ((dispatch) => __awaiter(this, void 0, void 0, function* () {
    return (dispatch(tokenAddressReset()));
}));
exports.resetTokenAddress = resetTokenAddress;
