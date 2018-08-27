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
const helpers_1 = require("computable/dist/helpers");
const constants_1 = require("../../../constants");
const initializers_1 = require("../../../initializers");
const selectors_1 = require("../../selectors");
exports.TOKEN_APPROVE_REQUEST = 'TOKEN_APPROVE_REQUEST';
exports.TOKEN_APPROVE_OK = 'TOKEN_APPROVE_OK';
exports.TOKEN_APPROVE_ERROR = 'TOKEN_APPROVE_ERROR';
exports.TOKEN_APPROVE_RESET = 'TOKEN_APPROVE_RESET';
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
const approve = ({ address, amount, from }) => ((dispatch, getState) => __awaiter(this, void 0, void 0, function* () {
    const state = getState();
    const args = { address, amount, from };
    dispatch(tokenApproveRequest(args));
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
        const contractAddress = selectors_1.getTokenAddress(state);
        if (!contractAddress) {
            throw new Error(constants_1.Errors.NO_TOKEN_FOUND);
        }
        const contract = new erc_20_1.default(owner.address);
        yield contract.at(web3, { address: contractAddress });
        const emitter = contract.getEventEmitter('Approval');
        contract.approve(address, amount, { from: from || owner.address });
        const eventLog = yield helpers_1.onData(emitter);
        const eventValues = eventLog.returnValues;
        const out = {
            address: eventValues.spender,
            from: eventValues.owner,
            amount: eventValues.value,
        };
        dispatch(tokenApproveOk(out));
        return out;
    }
    catch (err) {
        dispatch(tokenApproveError(err));
        return undefined;
    }
}));
exports.approve = approve;
const resetTokenApprove = () => ((dispatch) => __awaiter(this, void 0, void 0, function* () {
    return (dispatch(tokenApproveReset()));
}));
exports.resetTokenApprove = resetTokenApprove;
