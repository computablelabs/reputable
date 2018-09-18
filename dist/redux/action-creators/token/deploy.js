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
const actions_1 = require("./actions");
const deployToken = (supply) => ((dispatch, getState) => __awaiter(this, void 0, void 0, function* () {
    const state = getState();
    const args = { address: undefined, supply };
    dispatch(actions_1.tokenDeployRequest(args));
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
        dispatch(actions_1.tokenDeployOk({ address: tokenAddress, supply }));
        return tokenAddress;
    }
    catch (err) {
        dispatch(actions_1.tokenDeployError(err));
        return '';
    }
}));
exports.deployToken = deployToken;
