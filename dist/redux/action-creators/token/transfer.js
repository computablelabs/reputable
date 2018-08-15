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
const selectors_1 = require("../../selectors");
const constants_1 = require("../../../constants");
// Action Types
exports.TOKEN_TRANSFER_REQUEST = 'TOKEN_TRANSFER_REQUEST';
exports.TOKEN_TRANSFER_OK = 'TOKEN_TRANSFER_OK';
exports.TOKEN_TRANSFER_ERROR = 'TOKEN_TRANSFER_ERROR';
exports.TOKEN_TRANSFER_RESET = 'TOKEN_TRANSFER_RESET';
// Actions
const tokenTransferRequest = (value) => ({
    type: exports.TOKEN_TRANSFER_REQUEST,
    payload: value,
});
const tokenTransferOk = (value) => ({
    type: exports.TOKEN_TRANSFER_OK,
    payload: value,
});
const tokenTransferError = (value) => ({
    type: exports.TOKEN_TRANSFER_ERROR,
    payload: value,
});
const tokenTransferReset = () => ({
    type: exports.TOKEN_TRANSFER_RESET,
    payload: {},
});
// Action Creators
// TODO type the returned thunk
const transfer = (to, amount, from) => 
// TODO type the thunk args
(dispatch, getState) => __awaiter(this, void 0, void 0, function* () {
    const state = getState();
    const owner = selectors_1.getOwner(state);
    // a token must have been deployed by this point
    const tokenAddress = token_1.address(state);
    const ws = state.websocketAddress || '';
    const web3Provider = new web3_1.default.providers.WebsocketProvider(ws);
    const web3 = new web3_1.default(web3Provider);
    const contract = new erc_20_1.default(owner.address);
    // instantiate a contract from the deployed token
    tokenAddress && (yield contract.at(web3, { address: tokenAddress }, { from: owner.address }));
    if (!contract) {
        const error = new Error(constants_1.Errors.NO_TOKEN_FOUND);
        dispatch(tokenTransferError(error));
        return undefined;
    }
    const args = { to, amount, from: from || owner.address };
    // dispatch that a request has been initialized
    dispatch(tokenTransferRequest(args));
    // try the actual on-chain transfer
    try {
        const emitter = contract.getEventEmitter('Transfer');
        // we can allow the contract to fallback on the default account it was made from
        contract.transfer(to, amount);
        const eventLog = yield helpers_1.onData(emitter);
        const eventValues = eventLog.returnValues;
        const out = {
            from: eventValues.from,
            to: eventValues.to,
            amount: eventValues.value,
            id: eventLog.transactionHash,
        };
        dispatch(tokenTransferOk(out));
        return out;
    }
    catch (err) {
        dispatch(tokenTransferError(err));
        return undefined;
    }
});
exports.transfer = transfer;
const resetTokenTransfer = () => tokenTransferReset();
exports.resetTokenTransfer = resetTokenTransfer;
