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
const parameterizer_1 = __importDefault(require("computable/dist/contracts/parameterizer"));
const token_1 = require("../../selectors/token");
const voting_1 = require("../../selectors/voting");
const selectors_1 = require("../../selectors");
const constants_1 = require("../../../constants");
/**
 * support actions for the thunk deployToken action itself
 */
const deployParameterizerAction = (tokenAddress, votingAddress, opts = {}) => {
    // normalize the deploy object by defaulting falsy values here
    const payload = {
        // man, can be make the v2 parameterizer less argument-y? TODO
        tokenAddress,
        votingAddress,
        minDeposit: opts.minDeposit || constants_1.ParameterizerDefaults.MIN_DEPOSIT,
        pMinDeposit: opts.pMinDeposit || constants_1.ParameterizerDefaults.P_MIN_DEPOSIT,
        applyStageLen: opts.applyStageLen || constants_1.ParameterizerDefaults.APPLY_STAGE_LEN,
        pApplyStageLen: opts.pApplyStageLen || constants_1.ParameterizerDefaults.P_APPLY_STAGE_LEN,
        commitStageLen: opts.commitStageLen || constants_1.ParameterizerDefaults.COMMIT_STAGE_LEN,
        pCommitStageLen: opts.pCommitStageLen || constants_1.ParameterizerDefaults.P_COMMIT_STAGE_LEN,
        revealStageLen: opts.revealStageLen || constants_1.ParameterizerDefaults.REVEAL_STAGE_LEN,
        pRevealStageLen: opts.pRevealStageLen || constants_1.ParameterizerDefaults.P_REVEAL_STAGE_LEN,
        dispensationPct: opts.dispensationPct || constants_1.ParameterizerDefaults.DISPENSATION_PCT,
        pDispensationPct: opts.pDispensationPct || constants_1.ParameterizerDefaults.P_DISPENSATION_PCT,
        voteQuorum: opts.voteQuorum || constants_1.ParameterizerDefaults.VOTE_QUORUM,
        pVoteQuorum: opts.pVoteQuorum || constants_1.ParameterizerDefaults.P_VOTE_QUORUM,
    };
    return { type: constants_1.DEPLOY_PARAMETERIZER, payload };
};
/**
 * Note this action can be used if the application is using an already deployed token.
 * Simply dispatch this with the address of said token
 */
const deployedParameterizer = (address) => {
    const payload = { address };
    return { type: constants_1.DEPLOYED_PARAMETERIZER, payload };
};
const deployParameterizerError = (err) => ({ type: constants_1.DEPLOY_PARAMETERIZER_ERROR, payload: err });
/**
 * For applications which have not yet deployed a parameterizer, you can do it from here.
 * Used in Specs and tutorial apps as well...
 *
 * Note that we use the object `opts` here to house any number of the possible arguments, any
 * not specified should fall back to a set of defaults defined here in the app. Also, the
 * computable.js lib itself declares a set of defaults for the parameterizer - so any not specified
 * as defaults in this app will fall-back to those...
 *
 * Use of Partial on the deploy params as we do not expect you to pass the addresses of things already deployed
 */
const deployParameterizer = (address, opts) => {
    return (dispatch, getState) => __awaiter(this, void 0, void 0, function* () {
        const state = getState(), participants = selectors_1.getParticipants(state), admin = participants && participants[0], websocketAddress = state.websocketAddress, tokenAddress = token_1.address(state), votingAddress = voting_1.address(state);
        let parameterizerAddress = '';
        if (!websocketAddress)
            dispatch(deployParameterizerError(new Error(constants_1.Errors.NO_WEBSOCKETADDRESS_FOUND)));
        else if (!admin)
            dispatch(deployParameterizerError(new Error(constants_1.Errors.NO_ADMIN_FOUND)));
        else if (!tokenAddress)
            dispatch(deployParameterizerError(new Error(constants_1.Errors.NO_TOKEN_FOUND)));
        else if (!votingAddress)
            dispatch(deployParameterizerError(new Error(constants_1.Errors.NO_VOTING_FOUND)));
        else {
            // create web3 on demand with our provider
            const web3 = new web3_1.default(new web3_1.default.providers.WebsocketProvider(websocketAddress)), 
            // we can dispatch deploy early here, as deploy is not to be confused with deployed
            action = deployParameterizerAction(tokenAddress, votingAddress, opts);
            dispatch(action);
            // now that the deploy action is in flight, do the actual evm deploy and wait for the address
            const contract = new parameterizer_1.default(address || admin.address);
            try {
                // TSC is confused here, the payload is guaranteed to be a ParameterizerDeployParams
                // @ts-ignore:2345
                parameterizerAddress = yield contract.deploy(web3, action.payload);
                dispatch(deployedParameterizer(parameterizerAddress));
            }
            catch (err) {
                dispatch(deployParameterizerError(err));
            }
        }
        return parameterizerAddress;
    });
};
exports.deployParameterizer = deployParameterizer;
const resetParameterizer = () => ({ type: constants_1.RESET_PARAMETERIZER });
exports.resetParameterizer = resetParameterizer;
