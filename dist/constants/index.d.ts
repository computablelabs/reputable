declare enum DataSources {
    IPFS = "ipfs"
}
declare enum Contracts {
    TOKEN = "token",
    PARAMETERIZER = "parameterizer",
    VOTING = "voting",
    REGISTRY = "registry"
}
declare enum TokenDefaults {
    SUPPLY = 1000000
}
declare enum ParameterizerDefaults {
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
declare enum Errors {
    NO_ADMIN_FOUND = "No admin participant can be located. Be sure to register at least one participant",
    NO_WEBSOCKETADDRESS_FOUND = "No Websocket address can be found. Make sure to set your ws address as it is needed for a web3 provider",
    NO_TOKEN_FOUND = "No address for a deployed Token contract can be found. Be sure to deploy your Token contract",
    NO_REGISTRY_FOUND = "No address for a deployed Registry contract can be found. Be sure to deploy the Registry contract",
    NO_DLL_FOUND = "No address for a deployed DLL contract can be found. Be sure to deploy the DLL contract",
    NO_ATTRIBUTESTORE_FOUND = "No address for a deployed AttributeStore contract can be found. Be sure to deploy the AttributeStore contract",
    NO_VOTING_FOUND = "No address for a deployed PLCRVoting contract can be found. Be sure to deploy the Voting contract",
    NO_PARAMETERIZER_FOUND = "No address for a deployed Parameterizer contract can be found. Be sure to deploy the Parameterizer contract"
}
export { DataSources, Contracts, TokenDefaults, ParameterizerDefaults, Errors };
