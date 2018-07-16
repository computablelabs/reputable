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
const token_1 = require("../../selectors/token");
const constants_1 = require("../../../constants");
/**
 * support methods for the transfer Action Creator
 */
const transferral = (type, to, amount, from) => {
    const payload = { to, amount, from };
    return { type, payload };
};
const transferError = (err) => ({ type: constants_1.TRANSFER_ERROR, payload: err });
// TODO type the returned thunk
const transfer = (to, amount, from) => {
    // TODO type the thunk args
    return (dispatch, getState) => __awaiter(this, void 0, void 0, function* () {
        const state = getState(), 
        // a token must have been deployed by this point
        tokenAddress = token_1.address(state), ws = state.websocketAddress || '', web3 = new web3_1.default(new web3_1.default.providers.WebsocketProvider(ws)), contract = new erc_20_1.default(from);
        // instantiate a contract from the deployed token
        tokenAddress && (yield contract.at(web3, { address: tokenAddress }));
        let tx = null;
        if (!contract)
            dispatch(transferError(new Error(constants_1.Errors.NO_TOKEN_FOUND)));
        else {
            // dispatch transfer early as an in-flight notification
            dispatch(transferral(constants_1.TRANSFER, to, amount, from));
            // try the actual on-chain transfer
            try {
                // we can allow the contract to fallback on the default account it was made from
                tx = yield contract.transfer(to, amount);
                dispatch(transferral(constants_1.TRANSFERRED, to, amount, from));
            }
            catch (err) {
                dispatch(transferError(err));
            }
        }
        return tx;
    });
};
exports.transfer = transfer;
