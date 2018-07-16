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
const erc_20_1 = __importDefault(require("computable/dist/contracts/erc-20"));
const constants_1 = require("../../../constants");
/**
 * support actions for the thunk deployToken action itself
 */
const deployTokenAction = (address, supply) => {
    const payload = {
        address,
        supply: supply || constants_1.TokenDefaults.SUPPLY,
    };
    return { type: constants_1.DEPLOY_TOKEN, payload };
};
const deployedToken = (address) => {
    const payload = { address };
    return { type: constants_1.DEPLOYED_TOKEN, payload };
};
const deployTokenError = (err) => ({ type: constants_1.DEPLOY_TOKEN_ERROR, payload: err });
const deployToken = (address, supply) => {
    return (dispatch, getState) => __awaiter(this, void 0, void 0, function* () {
        const state = getState(), websocketAddress = state.websocketAddress, admin = state.participants && state.participants[0];
        let tokenAddress = '';
        if (!websocketAddress)
            dispatch(deployTokenError(new Error(constants_1.Errors.NO_WEBSOCKETADDRESS_FOUND)));
        else if (!admin)
            dispatch(deployTokenError(new Error(constants_1.Errors.NO_ADMIN_FOUND)));
        else {
            // create web3 on demand with our provider
            const web3 = new web3_1.default(new web3_1.default.providers.WebsocketProvider(websocketAddress)), 
            // we can dispatch deploy early here, as deploy is not to be confused with deployed
            action = deployTokenAction(address || admin.address);
            dispatch(action);
            // now that the deploy action is in flight, do the actual evm deploy and wait for the address
            const contract = new erc_20_1.default(address || admin.address);
            try {
                // we can just re-use our deploy action payload from above
                tokenAddress = yield contract.deploy(web3, action.payload);
                dispatch(deployedToken(tokenAddress));
            }
            catch (err) {
                dispatch(deployTokenError(err));
            }
        }
        return tokenAddress;
    });
};
exports.deployToken = deployToken;
// including with deployment actions as it fits best here
const resetToken = () => ({ type: constants_1.RESET_TOKEN });
exports.resetToken = resetToken;
