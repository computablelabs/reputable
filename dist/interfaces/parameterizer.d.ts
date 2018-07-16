import { Nos } from 'computable/dist/types';
/**
 * for any parameterizer related state we want to keep
 * NOTE: the eventual smart contract uses values which are seconds
 */
export default interface Parameterizer {
    address: string;
    minDeposit?: Nos;
    applyStageLen?: Nos;
    commitPeriodLen?: Nos;
    revealPeriodLen?: Nos;
    dispensationPct?: Nos;
    voteQuorum?: Nos;
    pMinDeposit?: Nos;
    pApplyStageLen?: Nos;
    pCommitPeriodLen?: Nos;
    pRevealPeriodLen?: Nos;
    pDispensationPct?: Nos;
    pVoteQuorum?: Nos;
}
