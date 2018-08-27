enum Contracts {
  TOKEN         = 'token',
  PARAMETERIZER = 'parameterizer',
  VOTING        = 'voting',
  REGISTRY      = 'registry',
}

enum TokenDefaults {
  SUPPLY = 1000000,
}

const THREE_MINUTES = 180
const HALF = 50

enum ParameterizerDefaults {
  MIN_DEPOSIT        = 1,             // the minimum deposit, in whatever funds, required to participate
  P_MIN_DEPOSIT      = 10,            // min dep required to propose a parameterization change
  APPLY_STAGE_LEN    = THREE_MINUTES, // time, in seconds, applicants must wait to be whitelisted. using 3 mins to allow time to challenge but not too long for a demo
  P_APPLY_STAGE_LEN  = THREE_MINUTES, // the period over which reparameterization proposals are processed.
  COMMIT_STAGE_LEN   = THREE_MINUTES, // length of the commit period for voting
  P_COMMIT_STAGE_LEN = THREE_MINUTES, // the same, but for reparameterization
  REVEAL_STAGE_LEN   = THREE_MINUTES, // length of reveal period for voting
  P_REVEAL_STAGE_LEN = THREE_MINUTES, // same for the Parameterizer
  DISPENSATION_PCT   = HALF,          // percentage of a losing party's percentage distributed to a winning party
  P_DISPENSATION_PCT = HALF,
  VOTE_QUORUM        = HALF,          // type of majority out of 100 required for a vote success
  P_VOTE_QUORUM      = HALF,
}

enum Errors {
  NO_ADMIN_FOUND            = 'No admin participant can be located. Be sure to register at least one participant',
  NO_WEBSOCKETADDRESS_FOUND = 'No Websocket address can be found. Make sure to set your ws address as it is needed for a web3 provider',
  NO_TOKEN_FOUND            = 'No address for a deployed Token contract can be found. Be sure to deploy your Token contract',
  NO_REGISTRY_FOUND         = 'No address for a deployed Registry contract can be found. Be sure to deploy the Registry contract',
  NO_DLL_FOUND              = 'No address for a deployed DLL contract can be found. Be sure to deploy the DLL contract',
  NO_ATTRIBUTESTORE_FOUND   = 'No address for a deployed AttributeStore contract can be found. Be sure to deploy the AttributeStore contract',
  NO_VOTING_FOUND           = 'No address for a deployed PLCRVoting contract can be found. Be sure to deploy the Voting contract',
  NO_PARAMETERIZER_FOUND    = 'No address for a deployed Parameterizer contract can be found. Be sure to deploy the Parameterizer contract',
}

export { Contracts, TokenDefaults, ParameterizerDefaults, Errors }

