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
const parameterizer_1 = __importDefault(require("computable/dist/contracts/parameterizer"));
const constants_1 = require("../../../constants");
const selectors_1 = require("../../selectors");
const initializers_1 = require("../../../initializers");
const actions_1 = require("./actions");
const deployParameterizer = (options) => ((dispatch, getState) => __awaiter(this, void 0, void 0, function* () {
    const state = getState();
    const args = { options };
    dispatch(actions_1.parameterizerDeployRequest(args));
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
        const contract = new parameterizer_1.default(owner.address);
        const parameterizerAddress = yield contract.deploy(web3, Object.assign({ tokenAddress,
            votingAddress }, options));
        dispatch(actions_1.parameterizerDeployOk({ address: parameterizerAddress }));
        return parameterizerAddress;
    }
    catch (err) {
        dispatch(actions_1.parameterizerDeployError(err));
        return '';
    }
}));
exports.deployParameterizer = deployParameterizer;
const setParameterizerAddress = (parameterizerAddress) => ((dispatch) => __awaiter(this, void 0, void 0, function* () {
    return (dispatch(actions_1.parameterizerAddressOk({ address: parameterizerAddress })));
}));
exports.setParameterizerAddress = setParameterizerAddress;
const resetParameterizerAddress = () => ((dispatch) => __awaiter(this, void 0, void 0, function* () {
    return (dispatch(actions_1.parameterizerAddressReset()));
}));
exports.resetParameterizerAddress = resetParameterizerAddress;
