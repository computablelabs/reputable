export declare const GET_APPLICATIONS = "get-applications";
export declare const GET_APPLICATIONS_ERROR = "get-applications-error";
export declare const CHALLENGE = "challenge";
export declare const CHALLENGE_ERROR = "challenge-error";
export declare const GET_CHALLENGES = "get-challenges";
export declare const GET_CHALLENGES_ERROR = "get-challenges-error";
export declare const LIST = "list";
export declare const LIST_ERROR = "list-error";
export declare const GET_LISTINGS = "get-listings";
export declare const DEPLOY_TOKEN = "deploy-token";
export declare const DEPLOY_TOKEN_ERROR = "deploy-token-error";
export declare const DEPLOYED_TOKEN = "deployed-token";
export declare const RESET_TOKEN = "reset-token";
export declare const TRANSFER = "transfer";
export declare const TRANSFER_ERROR = "transfer-error";
export declare const TRANSFERRED = "transferred";
export declare const DEPLOY_PARAMETERIZER = "deploy-parameterizer";
export declare const DEPLOY_PARAMETERIZER_ERROR = "deploy-parameterizer-error";
export declare const DEPLOYED_PARAMETERIZER = "deployed-parameterizer";
export declare const RESET_PARAMETERIZER = "reset-parameterizer";
export declare const DEPLOY_VOTING = "deploy-voting";
export declare const DEPLOY_VOTING_ERROR = "deploy-voting-error";
export declare const DEPLOYED_VOTING = "deployed-voting";
export declare const RESET_VOTING = "reset-voting";
export declare const DEPLOY_REGISTRY = "deploy-registry";
export declare const DEPLOY_REGISTRY_ERROR = "deploy-registry-error";
export declare const DEPLOYED_REGISTRY = "deployed-registry";
export declare const RESET_REGISTRY = "reset-registry";
export declare const WEBSOCKET_ADDRESS_SET = "websocket-address-set";
export declare const RESET_WEBSOCKET_ADDRESS = "reset-websocket-address";
export declare enum Contracts {
    TOKEN = "token",
    PARAMETERIZER = "parameterizer",
    VOTING = "voting",
    REGISTRY = "registry"
}
export declare enum TokenDefaults {
    SUPPLY = 1000000
}
export declare enum ParameterizerDefaults {
    MIN_DEPOSIT = 1,
    P_MIN_DEPOSIT = 10,
    APPLY_STAGE_LEN,
    P_APPLY_STAGE_LEN,
    COMMIT_STAGE_LEN,
    P_COMMIT_STAGE_LEN,
    REVEAL_STAGE_LEN,
    P_REVEAL_STAGE_LEN,
    DISPENSATION_PCT,
    P_DISPENSATION_PCT,
    VOTE_QUORUM,
    P_VOTE_QUORUM
}
export declare enum Errors {
    NO_ADMIN_FOUND = "No admin participant can be located. Be sure to register at least one participant",
    NO_WEBSOCKETADDRESS_FOUND = "No Websocket address can be found. Make sure to set your ws address as it is needed for a web3 provider",
    NO_TOKEN_FOUND = "No instantiated token contract is in the state tree. Be sure to deploy your token first",
    NO_DLL_FOUND = "No address for a deployed DLL contract can be found. Make sure to deploy the DLL contract",
    NO_ATTRIBUTESTORE_FOUND = "No address for a deployed AttributeStore contract can be found. Be sure to deploy the AttributeStore contract",
    NO_VOTING_FOUND = "No address for a deployed PLCRVoting contract can be found. Be sure to deploy the Voting contract",
    NO_PARAMETERIZER_FOUND = "No address for a deployed Parameterizer contract can be found. Be sure to deploy the Parameterizer contract"
}
