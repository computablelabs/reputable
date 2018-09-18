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
const plcr_voting_1 = __importDefault(require("computable/dist/contracts/plcr-voting"));
const constants_1 = require("../../../constants");
const initializers_1 = require("../../../initializers");
const selectors_1 = require("../../selectors");
const actions_1 = require("./actions");
const deployVoting = () => ((dispatch, getState) => __awaiter(this, void 0, void 0, function* () {
    const state = getState();
    const args = {};
    dispatch(actions_1.votingDeployRequest(args));
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
        const dllAddress = selectors_1.getDllAddress(state);
        if (!dllAddress) {
            throw new Error(constants_1.Errors.NO_DLL_FOUND);
        }
        const attributeStoreAddress = selectors_1.getAttributeStoreAddress(state);
        if (!attributeStoreAddress) {
            throw new Error(constants_1.Errors.NO_ATTRIBUTESTORE_FOUND);
        }
        const contract = new plcr_voting_1.default(owner.address);
        const votingAddress = yield contract.deploy(web3, {
            tokenAddress,
            dllAddress,
            attributeStoreAddress,
        });
        dispatch(actions_1.votingDeployOk({ address: votingAddress }));
        return votingAddress;
    }
    catch (err) {
        dispatch(actions_1.votingDeployError(err));
        return '';
    }
}));
exports.deployVoting = deployVoting;
