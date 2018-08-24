/**
 * hold state related to the registry contract
 */

import { RegistryListing } from 'computable/dist/interfaces'
import { Nos } from 'computable/dist/types'

// our shape for applicant is simply the 3 args required for the apply method
export interface Applicant {
  name: string; // this can be just about anynthing. NOTE: will need to be hashed on calling registry.apply by using the helper `stringToBytes`
  deposit?: Nos; // will default to the paramaterizer MIN_DEPOSIT if excluded
  data?: string; // again, just about anything can go here.
}

export interface Challenge {

}

// the registry listing in computable does not keep the generated hash
// of the "name". We want to have it here however to reference with that
// name that exists on any Applications
export interface Listing extends RegistryListing {
  hash: string;
}

export interface Registry {
  // deployed address of the registry contract, can be falsy at first
  address?: string;
  applicants?: Applicant[];
  challenges?: Challenge[];
  listings?: Listing[];
}
