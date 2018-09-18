interface RequestVotingRightsParams {
    tokens: number;
    userAddress: string;
}
declare const requestVotingRights: ({ tokens, userAddress }: RequestVotingRightsParams) => any;
interface CommitVoteParams {
    challengeID: string;
    voterAddress: string;
    vote: number;
    tokens: number;
    salt: string;
}
declare const commitVote: ({ challengeID, voterAddress, vote, tokens, salt, }: CommitVoteParams) => any;
export { requestVotingRights, commitVote };
