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
/**
 * It is debateable how useful the full range of actions are for deploying the two
 * voting contract dependencies (dll, attrStore). That being said, I'm just being consistent so...
 *
 * Note that there is no Higher Order Contract for them, but a helper for each
 */
const deployDllAction = () => ({ type: constants_1.DEPLOY_DLL });
const deployedDll = (address) => {
    const payload = { address };
    return { type: constants_1.DEPLOYED_DLL, payload };
};
const deployDllError = (err) => ({ type: constants_1.DEPLOY_DLL_ERROR, payload: err });
const deployDll = (address) => {
    return (dispatch, getState) => __awaiter(this, void 0, void 0, function* () {
        const state = getState(), participants = selectors_1.getParticipants(state), admin = participants && participants[0], websocketAddress = state.websocketAddress;
        let dllAddress = '', dll;
        if (!websocketAddress)
            dispatch(deployDllError(new Error(constants_1.Errors.NO_WEBSOCKETADDRESS_FOUND)));
        else if (!admin)
            dispatch(deployDllError(new Error(constants_1.Errors.NO_ADMIN_FOUND)));
        else {
            const web3 = new web3_1.default(new web3_1.default.providers.WebsocketProvider(websocketAddress));
            dispatch(deployDllAction());
            try {
                // note that the computable deploy helpers return the actual contract
                dll = yield helpers_1.deployDll(web3, address || admin.address);
                // any raw web3.eth.Contract will have its address @ contract.options.address
                dllAddress = dll.options.address;
                dispatch(deployedDll(dllAddress));
            }
            catch (err) {
                dispatch(deployDllError(err));
            }
        }
        return dllAddress;
    });
};
exports.deployDll = deployDll;
const resetDll = () => ({ type: constants_1.RESET_DLL });
exports.resetDll = resetDll;
