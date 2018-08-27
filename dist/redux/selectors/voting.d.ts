import { State, Voting } from '../../interfaces';
declare const getVoting: (state?: State) => Voting | undefined;
declare const getVotingAddress: (state?: State) => string;
export { getVoting, getVotingAddress };
