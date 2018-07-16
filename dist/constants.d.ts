export declare const PARTICIPATE = "participate";
export declare const PARTICIPATE_ERROR = "participate-error";
export declare const RESET_PARTICIPANTS = "reset-participants";
export declare const APPLY = "apply";
export declare const APPLY_ERROR = "apply-error";
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
export declare const APPROVE = "approve";
export declare const APPROVE_ERROR = "approve-error";
export declare const APPROVED = "approved";
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
export declare enum Errors {
    NO_ADMIN_FOUND = "No admin participant can be located. Be sure to register at least one participant",
    NO_WEBSOCKETADDRESS_FOUND = "No Websocket address can be found. Make sure to set your ws address as it is needed for a web3 provider",
    NO_TOKEN_FOUND = "No instantiated token contract is in the state tree. Be sure to deploy your token first"
}
