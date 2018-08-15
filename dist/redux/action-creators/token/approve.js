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
const helpers_1 = require("computable/dist/helpers");
const token_1 = require("../../selectors/token");
const constants_1 = require("../../../constants");
const selectors_1 = require("../../selectors");
// Action Types
exports.TOKEN_APPROVE_REQUEST = 'TOKEN_APPROVE_REQUEST';
exports.TOKEN_APPROVE_OK = 'TOKEN_APPROVE_OK';
exports.TOKEN_APPROVE_ERROR = 'TOKEN_APPROVE_ERROR';
exports.TOKEN_APPROVE_RESET = 'TOKEN_APPROVE_RESET';
// Actions
const tokenApproveRequest = (value) => ({
    type: exports.TOKEN_APPROVE_REQUEST,
    payload: value,
});
const tokenApproveOk = (value) => ({
    type: exports.TOKEN_APPROVE_OK,
    payload: value,
});
const tokenApproveError = (value) => ({
    type: exports.TOKEN_APPROVE_ERROR,
    payload: value,
});
const tokenApproveReset = () => ({
    type: exports.TOKEN_APPROVE_RESET,
    payload: {},
});
// Action Creators
// TODO type the returned thunk vs `any`
const approve = (address, amount, from) => (dispatch, getState) => __awaiter(this, void 0, void 0, function* () {
    const state = getState();
    const owner = selectors_1.getOwner(state);
    // a token must have been deployed by this point
    const tokenAddress = token_1.address(state);
    const ws = state.websocketAddress || '';
    const web3Provider = new web3_1.default.providers.WebsocketProvider(ws);
    const web3 = new web3_1.default(web3Provider);
    const contract = new erc_20_1.default(owner.address);
    // instantiate a higher order contract with the deployed contract address
    tokenAddress && (yield contract.at(web3, { address: tokenAddress }));
    if (!contract) {
        const error = new Error(constants_1.Errors.NO_TOKEN_FOUND);
        dispatch(tokenApproveError(error));
        return undefined;
    }
    const args = { address, amount, from: from || owner.address };
    // dispatch that a request has been initialized
    dispatch(tokenApproveRequest(args));
    try {
        const emitter = contract.getEventEmitter('Approval');
        // we can allow the contract to fallback to the account it was instantiated with as `from`
        contract.approve(address, amount, { from });
        const eventLog = yield helpers_1.onData(emitter);
        const eventValues = eventLog.returnValues;
        const out = {
            owner: eventValues.owner,
            spender: eventValues.spender,
            value: eventValues.value,
        };
        dispatch(tokenApproveOk(out));
        return out;
    }
    catch (err) {
        dispatch(tokenApproveError(err));
        return undefined;
    }
});
exports.approve = approve;
const resetTokenApprove = () => tokenApproveReset();
exports.resetTokenApprove = resetTokenApprove;
