export declare const VOTING_DEPLOY_REQUEST = "VOTING_DEPLOY_REQUEST";
export declare const VOTING_DEPLOY_OK = "VOTING_DEPLOY_OK";
export declare const VOTING_DEPLOY_ERROR = "VOTING_DEPLOY_ERROR";
export declare const VOTING_ADDRESS_OK = "VOTING_DEPLOY_ADDRESS_OK";
export declare const VOTING_ADDRESS_RESET = "VOTING_DEPLOY_ADDRESS_RESET";
declare const deployVoting: () => any;
declare const setVotingAddress: (votingAddress: string) => any;
declare const resetVotingAddress: () => any;
export { deployVoting, setVotingAddress, resetVotingAddress };
