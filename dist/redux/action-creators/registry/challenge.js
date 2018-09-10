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
const registry_1 = __importDefault(require("computable/dist/contracts/registry"));
const constants_1 = require("../../../constants");
const initializers_1 = require("../../../initializers");
const selectors_1 = require("../../selectors");
const actions_1 = require("./actions");
const fetchChallenge = (challengeID) => ((dispatch, getState) => __awaiter(this, void 0, void 0, function* () {
    const state = getState();
    const args = { challengeID };
    dispatch(actions_1.registryChallengeRequest(args));
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
        const contractAddress = selectors_1.getRegistryAddress(state);
        if (!contractAddress) {
            throw new Error(constants_1.Errors.NO_REGISTRY_FOUND);
        }
        const registry = new registry_1.default(owner.address);
        yield registry.at(web3, { address: contractAddress });
        const challenge = yield registry.challenges(challengeID);
        const out = {
            challengeID,
            rewardPool: challenge.rewardPool,
            challenger: challenge.challenger,
            resolved: challenge.resolved,
            stake: challenge.stake,
            totalTokens: challenge.totalTokens,
            rewardsClaimed: challenge.rewardsClaimed,
        };
        dispatch(actions_1.registryChallengeOk(out));
        return out;
    }
    catch (err) {
        dispatch(actions_1.registryChallengeError(err));
        return undefined;
    }
}));
exports.fetchChallenge = fetchChallenge;
const challengeListing = ({ listingHash, userAddress }) => ((dispatch, getState) => __awaiter(this, void 0, void 0, function* () {
    const state = getState();
    const args = { listingHash, userAddress };
    dispatch(actions_1.registryChallengeRequest(args));
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
        const contractAddress = selectors_1.getRegistryAddress(state);
        if (!contractAddress) {
            throw new Error(constants_1.Errors.NO_REGISTRY_FOUND);
        }
        const registry = new registry_1.default(owner.address);
        yield registry.at(web3, { address: contractAddress });
        let out = {};
        const emitterChallenge = registry.getEventEmitter('_Challenge');
        emitterChallenge.on('data', (log) => {
            const eventValues = log.returnValues;
            out = {
                listingHash: eventValues.listingHash,
                id: eventValues.id,
                challenger: eventValues.challenger,
                commitExpiry: eventValues.commitExpiry,
                revealExpiry: eventValues.revealExpiry,
            };
            dispatch(actions_1.registryChallengeOk(out));
            const listing = selectors_1.getListing(state, eventValues.listingHash);
            if (listing) {
                listing.challenge = eventValues.id;
                dispatch(actions_1.registryListingOk(listing));
            }
        });
        yield registry.challenge(listingHash, '', { from: userAddress });
        emitterChallenge.unsubscribe();
        return out;
    }
    catch (err) {
        dispatch(actions_1.registryChallengeError(err));
        return undefined;
    }
}));
exports.challengeListing = challengeListing;
const resetRegistryChallenges = () => ((dispatch) => __awaiter(this, void 0, void 0, function* () {
    dispatch(actions_1.registryChallengeReset());
}));
exports.resetRegistryChallenges = resetRegistryChallenges;
