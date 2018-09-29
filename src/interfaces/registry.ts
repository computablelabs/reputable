/**
 * hold state related to the registry contract
 */

import { RegistryListing, Challenge as RegistryChallenge } from 'computable/dist/interfaces'
import { GenericMap, Map } from '../interfaces'

interface Registry {
  // deployed address of the registry contract, can be falsy at first
  address?: string
  challenges?: GenericMap<Challenge>
  listings?: GenericMap<Listing>
}

interface ApplicantData {
  source?: string
  value: Map|string
}

interface Challenge extends RegistryChallenge {
  id: string
  listingHash: string
  commitExpiry: number
  revealExpiry: number
}

// the registry listing in computable does not keep the generated hash
// of the "name". We want to have it here however to reference with that
// name that exists on any Applications
interface Listing extends RegistryListing {
  listingHash: string
  data?: ApplicantData|string
}

export {
  Registry,
  ApplicantData,
  Challenge,
  Listing,
}

