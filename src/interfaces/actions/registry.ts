import { Applicant, Listing, Challenge } from '../registry'

export interface Apply extends Applicant {
  type:string;
}

export interface List extends Listing {
  type:string;
}

// unfortunately the noun/verb doesn't holde here so we'll use *Action
export interface ChallengeAction extends Challenge {
  type:string;
}
