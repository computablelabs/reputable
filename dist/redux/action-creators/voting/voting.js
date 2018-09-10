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
const selectors_1 = require("../../selectors");
const initializers_1 = require("../../../initializers");
const actions_1 = require("./actions");
const requestVotingRights = ({ tokens, userAddress }) => ((dispatch, getState) => __awaiter(this, void 0, void 0, function* () {
    const state = getState();
    const args = {};
    dispatch(actions_1.votingVoteRequest(args));
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
        const contractAddress = selectors_1.getVotingAddress(state);
        if (!contractAddress) {
            throw new Error(constants_1.Errors.NO_VOTING_FOUND);
        }
        const contract = new plcr_voting_1.default(owner.address);
        yield contract.at(web3, { address: contractAddress });
        let out = {};
        const emitter = contract.getEventEmitter('');
        emitter.on('data', (log) => {
            const eventValues = log.returnValues;
            out = {
                tokens: eventValues.numTokens,
                voter: eventValues.voter,
            };
            dispatch(actions_1.votingVoteOk(out));
        });
        yield contract.requestVotingRights(tokens, {
            from: userAddress,
        });
        emitter.unsubscribe();
    }
    catch (err) {
        dispatch(actions_1.votingVoteError(err));
    }
}));
exports.requestVotingRights = requestVotingRights;
const commitVote = ({ challengeID, voterAddress, vote, tokens, salt, }) => ((dispatch, getState) => __awaiter(this, void 0, void 0, function* () {
    const state = getState();
    const args = { challengeID, voterAddress, vote, tokens };
    dispatch(actions_1.votingVoteRequest(args));
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
        const contractAddress = selectors_1.getVotingAddress(state);
        if (!contractAddress) {
            throw new Error(constants_1.Errors.NO_VOTING_FOUND);
        }
        const contract = new plcr_voting_1.default(owner.address);
        yield contract.at(web3, { address: contractAddress });
        let out = {};
        const emitter = contract.getEventEmitter('_VoteCommitted');
        emitter.on('data', (log) => {
            const eventValues = log.returnValues;
            out = {
                challengeId: eventValues.pollID,
                tokens: eventValues.numTokens,
                voter: eventValues.voter,
            };
            dispatch(actions_1.votingVoteOk(out));
        });
        yield contract.commitVote(web3, challengeID, voterAddress, vote, tokens, salt);
    }
    catch (err) {
        dispatch(actions_1.votingVoteError(err));
    }
}));
exports.commitVote = commitVote;
