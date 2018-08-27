import { Nos } from 'computable/dist/types';
import { Deployed } from './general';
export default interface Parameterizer extends Deployed {
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
