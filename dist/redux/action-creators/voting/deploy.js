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
const plcr_voting_1 = __importDefault(require("computable/dist/contracts/plcr-voting"));
const token_1 = require("../../selectors/token");
const selectors_1 = require("../../selectors");
const constants_1 = require("../../../constants");
/**
 * support actions for the thunk action creator
 *
 * Note that we treat the deployment of the DLL and AttributeStore contracts seperate
 * from deploying the Voting contract
 *
 * That does not mean that we can't introduce a bundled action later that deploys
 * the dependencies (dll, attrStore) first, then the voting...
 */
// NOTE all 3 necessary addresses should be in the state tree by this point: token, dll, attributeStore
const deployVotingAction = () => ({ type: constants_1.DEPLOY_VOTING });
const deployedVoting = (address) => {
    const payload = { address };
    return { type: constants_1.DEPLOYED_VOTING, payload };
};
const deployVotingError = (err) => ({ type: constants_1.DEPLOY_VOTING_ERROR, payload: err });
const deployVoting = (address) => {
    return (dispatch, getState) => __awaiter(this, void 0, void 0, function* () {
        const state = getState(), 
        // TODO 'admin' selector maybe...
        participants = selectors_1.getParticipants(state), admin = participants && participants[0], websocketAddress = state.websocketAddress, tokenAddress = token_1.address(state), dllAddress = state.dllAddress, attributeStoreAddress = state.attributeStoreAddress;
        let votingAddress = '';
        if (!websocketAddress)
            dispatch(deployVotingError(new Error(constants_1.Errors.NO_WEBSOCKETADDRESS_FOUND)));
        else if (!admin)
            dispatch(deployVotingError(new Error(constants_1.Errors.NO_ADMIN_FOUND)));
        else if (!tokenAddress)
            dispatch(deployVotingError(new Error(constants_1.Errors.NO_TOKEN_FOUND)));
        else if (!dllAddress)
            dispatch(deployVotingError(new Error(constants_1.Errors.NO_DLL_FOUND)));
        else if (!attributeStoreAddress)
            dispatch(deployVotingError(new Error(constants_1.Errors.NO_ATTRIBUTESTORE_FOUND)));
        else {
            // create web3 on demand with our provider
            const web3 = new web3_1.default(new web3_1.default.providers.WebsocketProvider(websocketAddress));
            // we can dispatch deploy early here, as deploy is not to be confused with deployed)
            dispatch(deployVotingAction());
            // now that the deploy action is in flight, do the actual evm deploy and wait for the address
            const contract = new plcr_voting_1.default(address || admin.address);
            try {
                votingAddress = yield contract.deploy(web3, { tokenAddress, dllAddress, attributeStoreAddress });
                dispatch(deployedVoting(votingAddress));
            }
            catch (err) {
                dispatch(deployVotingError(err));
            }
        }
        return votingAddress;
    });
};
exports.deployVoting = deployVoting;
const resetVoting = () => ({ type: constants_1.RESET_VOTING });
exports.resetVoting = resetVoting;
