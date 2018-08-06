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
const token_1 = require("../../selectors/token");
const voting_1 = require("../../selectors/voting");
const parameterizer_1 = require("../../selectors/parameterizer");
const selectors_1 = require("../../selectors");
const constants_1 = require("../../../constants");
/**
 * support actions for the thunk deployToken action itself
 */
const deployRegistryAction = (tokenAddress, votingAddress, parameterizerAddress, name) => {
    const payload = {
        tokenAddress,
        votingAddress,
        parameterizerAddress,
        name,
    };
    return { type: constants_1.DEPLOY_REGISTRY, payload };
};
/**
 * Note this action can be used if the application is using an already deployed token.
 * Simply dispatch this with the address of said token
 */
const deployedRegistry = (address) => {
    const payload = { address };
    return { type: constants_1.DEPLOYED_REGISTRY, payload };
};
const deployRegistryError = (err) => ({ type: constants_1.DEPLOY_REGISTRY_ERROR, payload: err });
/**
 * Pass in a name for the registry and optionally a deploy-from address (will default to admin if falsy)
 */
const deployRegistry = (name, address) => {
    return (dispatch, getState) => __awaiter(this, void 0, void 0, function* () {
        const state = getState(), websocketAddress = state.websocketAddress, participants = selectors_1.getParticipants(state), admin = participants && participants[0], tokenAddress = token_1.address(state), votingAddress = voting_1.address(state), parameterizerAddress = parameterizer_1.address(state);
        let registryAddress = '';
        if (!websocketAddress)
            dispatch(deployRegistryError(new Error(constants_1.Errors.NO_WEBSOCKETADDRESS_FOUND)));
        else if (!admin)
            dispatch(deployRegistryError(new Error(constants_1.Errors.NO_ADMIN_FOUND)));
        else if (!tokenAddress)
            dispatch(deployRegistryError(new Error(constants_1.Errors.NO_TOKEN_FOUND)));
        else if (!votingAddress)
            dispatch(deployRegistryError(new Error(constants_1.Errors.NO_VOTING_FOUND)));
        else if (!parameterizerAddress)
            dispatch(deployRegistryError(new Error(constants_1.Errors.NO_PARAMETERIZER_FOUND)));
        else {
            // create web3 on demand with our provider
            const web3 = new web3_1.default(new web3_1.default.providers.WebsocketProvider(websocketAddress)), 
            // we can dispatch deploy early here, as deploy is not to be confused with deployed
            action = deployRegistryAction(tokenAddress, votingAddress, parameterizerAddress, name);
            dispatch(action);
            // now that the deploy action is in flight, do the actual evm deploy and wait for the address
            const contract = new registry_1.default(address || admin.address);
            try {
                // @ts-ignore:2345
                registryAddress = yield contract.deploy(web3, action.payload);
                dispatch(deployedRegistry(registryAddress));
            }
            catch (err) {
                dispatch(deployRegistryError(err));
            }
        }
        return registryAddress;
    });
};
exports.deployRegistry = deployRegistry;
// including with deployment actions as it fits best here
const resetRegistry = () => ({ type: constants_1.RESET_REGISTRY });
exports.resetRegistry = resetRegistry;
