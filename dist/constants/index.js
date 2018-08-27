"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Contracts;
(function (Contracts) {
    Contracts["TOKEN"] = "token";
    Contracts["PARAMETERIZER"] = "parameterizer";
    Contracts["VOTING"] = "voting";
    Contracts["REGISTRY"] = "registry";
})(Contracts || (Contracts = {}));
exports.Contracts = Contracts;
var TokenDefaults;
(function (TokenDefaults) {
    TokenDefaults[TokenDefaults["SUPPLY"] = 1000000] = "SUPPLY";
})(TokenDefaults || (TokenDefaults = {}));
exports.TokenDefaults = TokenDefaults;
const THREE_MINUTES = 180;
const HALF = 50;
var ParameterizerDefaults;
(function (ParameterizerDefaults) {
    ParameterizerDefaults[ParameterizerDefaults["MIN_DEPOSIT"] = 1] = "MIN_DEPOSIT";
    ParameterizerDefaults[ParameterizerDefaults["P_MIN_DEPOSIT"] = 10] = "P_MIN_DEPOSIT";
    ParameterizerDefaults[ParameterizerDefaults["APPLY_STAGE_LEN"] = THREE_MINUTES] = "APPLY_STAGE_LEN";
    ParameterizerDefaults[ParameterizerDefaults["P_APPLY_STAGE_LEN"] = THREE_MINUTES] = "P_APPLY_STAGE_LEN";
    ParameterizerDefaults[ParameterizerDefaults["COMMIT_STAGE_LEN"] = THREE_MINUTES] = "COMMIT_STAGE_LEN";
    ParameterizerDefaults[ParameterizerDefaults["P_COMMIT_STAGE_LEN"] = THREE_MINUTES] = "P_COMMIT_STAGE_LEN";
    ParameterizerDefaults[ParameterizerDefaults["REVEAL_STAGE_LEN"] = THREE_MINUTES] = "REVEAL_STAGE_LEN";
    ParameterizerDefaults[ParameterizerDefaults["P_REVEAL_STAGE_LEN"] = THREE_MINUTES] = "P_REVEAL_STAGE_LEN";
    ParameterizerDefaults[ParameterizerDefaults["DISPENSATION_PCT"] = HALF] = "DISPENSATION_PCT";
    ParameterizerDefaults[ParameterizerDefaults["P_DISPENSATION_PCT"] = HALF] = "P_DISPENSATION_PCT";
    ParameterizerDefaults[ParameterizerDefaults["VOTE_QUORUM"] = HALF] = "VOTE_QUORUM";
    ParameterizerDefaults[ParameterizerDefaults["P_VOTE_QUORUM"] = HALF] = "P_VOTE_QUORUM";
})(ParameterizerDefaults || (ParameterizerDefaults = {}));
exports.ParameterizerDefaults = ParameterizerDefaults;
var Errors;
(function (Errors) {
    Errors["NO_ADMIN_FOUND"] = "No admin participant can be located. Be sure to register at least one participant";
    Errors["NO_WEBSOCKETADDRESS_FOUND"] = "No Websocket address can be found. Make sure to set your ws address as it is needed for a web3 provider";
    Errors["NO_TOKEN_FOUND"] = "No address for a deployed Token contract can be found. Be sure to deploy your Token contract";
    Errors["NO_REGISTRY_FOUND"] = "No address for a deployed Registry contract can be found. Be sure to deploy the Registry contract";
    Errors["NO_DLL_FOUND"] = "No address for a deployed DLL contract can be found. Be sure to deploy the DLL contract";
    Errors["NO_ATTRIBUTESTORE_FOUND"] = "No address for a deployed AttributeStore contract can be found. Be sure to deploy the AttributeStore contract";
    Errors["NO_VOTING_FOUND"] = "No address for a deployed PLCRVoting contract can be found. Be sure to deploy the Voting contract";
    Errors["NO_PARAMETERIZER_FOUND"] = "No address for a deployed Parameterizer contract can be found. Be sure to deploy the Parameterizer contract";
})(Errors || (Errors = {}));
exports.Errors = Errors;
