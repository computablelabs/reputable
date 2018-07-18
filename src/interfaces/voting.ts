/**
 * any state relevant to the voting contract we want to keep
 */

// TODO prob want to have a general `Deployed` interface that is just { address }
export interface DeployedVoting {
  address:string;
}

export interface Voting {
  address:string;
  // TODO what else...
}
