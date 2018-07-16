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
 * support actions for the thunk approve action
 *
 * Approve and Approved send the same args, with approve functioning as an
 * in-flight notification. We dont, via the reducer, add the approval to the state tree
 * however until Approved
 */
const approval = (type, address, amount, from) => {
    const payload = { address, amount, from };
    return { type, payload };
};
const approvalError = (err) => ({ type: constants_1.APPROVE_ERROR, payload: err });
// TODO type the returned thunk vs `any`
const approve = (address, amount, from) => {
    // TODO type the dispatch and getState args
    return (dispatch, getState) => __awaiter(this, void 0, void 0, function* () {
        const state = getState(), 
        // a token must have been deployed by this point
        tokenAddress = token_1.address(state), 
        // we can assume that if a token has been deployed a ws has been provided
        ws = state.websocketAddress || '', web3 = new web3_1.default(new web3_1.default.providers.WebsocketProvider(ws)), contract = new erc_20_1.default(from);
        // instantiate a higher order contract with the deployed contract address
        tokenAddress && (yield contract.at(web3, { address: tokenAddress }));
        let tx = null;
        if (!contract)
            dispatch(approvalError(new Error(constants_1.Errors.NO_TOKEN_FOUND)));
        else {
            // dispatch approve early as an in-flight notification
            dispatch(approval(constants_1.APPROVE, address, amount, from));
            try {
                // we can allow the contract to fallback to the account it was instantiated with as `from`
                tx = yield contract.approve(address, amount);
                dispatch(approval(constants_1.APPROVED, address, amount, from));
            }
            catch (err) {
                dispatch(approvalError(err));
            }
        }
        return tx;
    });
};
exports.approve = approve;
