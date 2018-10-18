// Local Dependencies
import {
  FSA,
  Map,
  Deployed,
  Listing,
} from '../../../interfaces'

/* Action Types */
export const REGISTRY_RESET = 'REGISTRY_RESET'

export const REGISTRY_DEPLOY_REQUEST = 'REGISTRY_DEPLOY_REQUEST'
export const REGISTRY_DEPLOY_OK = 'REGISTRY_DEPLOY_OK'
export const REGISTRY_DEPLOY_ERROR = 'REGISTRY_DEPLOY_ERROR'

export const REGISTRY_ADDRESS_OK = 'REGISTRY_ADDRESS_OK'
export const REGISTRY_ADDRESS_RESET = 'REGISTRY_ADDRESS_RESET'

export const REGISTRY_LISTING_REQUEST = 'REGISTRY_LISTING_REQUEST'
export const REGISTRY_LISTING_OK = 'REGISTRY_LISTING_OK'
export const REGISTRY_LISTING_ERROR = 'REGISTRY_LISTING_ERROR'
export const REGISTRY_LISTING_RESET = 'REGISTRY_LISTING_RESET'

export const REGISTRY_APPLY_REQUEST = 'REGISTRY_APPLY_REQUEST'
export const REGISTRY_APPLY_OK = 'REGISTRY_APPLY_OK'
export const REGISTRY_APPLY_ERROR = 'REGISTRY_APPLY_ERROR'

export const REGISTRY_REMOVE_REQUEST = 'REGISTRY_REMOVE_REQUEST'
export const REGISTRY_REMOVE_OK = 'REGISTRY_REMOVE_OK'
export const REGISTRY_REMOVE_ERROR = 'REGISTRY_REMOVE_ERROR'

export const REGISTRY_CHALLENGE_REQUEST = 'REGISTRY_CHALLENGE_REQUEST'
export const REGISTRY_CHALLENGE_OK = 'REGISTRY_CHALLENGE_OK'
export const REGISTRY_CHALLENGE_ERROR = 'REGISTRY_CHALLENGE_ERROR'
export const REGISTRY_CHALLENGE_RESET = 'REGISTRY_CHALLENGE_RESET'

/* Actions */
// General
export const registryReset = (): FSA => ({
  type: REGISTRY_RESET,
  payload: {},
})

// Deployment
export const registryDeployRequest = (value: Map): FSA => ({
  type: REGISTRY_DEPLOY_REQUEST,
  payload: value,
})

export const registryDeployOk = (value: Deployed): FSA => ({
  type: REGISTRY_DEPLOY_OK,
  payload: value
})

export const registryDeployError = (value: Error): FSA => ({
  type: REGISTRY_DEPLOY_ERROR,
  payload: value,
})

// Address
export const registryAddressOk = (value: Deployed): FSA => ({
  type: REGISTRY_ADDRESS_OK,
  payload: value,
})

export const registryAddressReset = (): FSA => ({
  type: REGISTRY_ADDRESS_RESET,
  payload: {},
})

// Listings
export const registryListingRequest = (value: Map): FSA => ({
  type: REGISTRY_LISTING_REQUEST,
  payload: value,
})

export const registryListingOk = (value: Map): FSA => ({
  type: REGISTRY_LISTING_OK,
  payload: value,
})

export const registryListingError = (value: Error): FSA => ({
  type: REGISTRY_LISTING_ERROR,
  payload: value,
})

export const registryListingReset = (): FSA => ({
  type: REGISTRY_LISTING_RESET,
  payload: {},
})

// Apply Listing
export const registryApplyRequest = (value: Map): FSA => ({
  type: REGISTRY_APPLY_REQUEST,
  payload: value,
})

export const registryApplyOk = (value: Listing): FSA => ({
  type: REGISTRY_APPLY_OK,
  payload: value,
})

export const registryApplyError = (value: Error): FSA => ({
  type: REGISTRY_APPLY_ERROR,
  payload: value,
})

// Remove Listing
export const registryRemoveRequest = (value: Map): FSA => ({
  type: REGISTRY_REMOVE_REQUEST,
  payload: value,
})

export const registryRemoveOk = (value: Listing): FSA => ({
  type: REGISTRY_REMOVE_OK,
  payload: value,
})

export const registryRemoveError = (value: Error): FSA => ({
  type: REGISTRY_REMOVE_ERROR,
  payload: value,
})

// Challenges
export const registryChallengeRequest = (value: Map): FSA => ({
  type: REGISTRY_CHALLENGE_REQUEST,
  payload: value,
})

export const registryChallengeOk = (value: Map): FSA => ({
  type: REGISTRY_CHALLENGE_OK,
  payload: value,
})

export const registryChallengeError = (value: Error): FSA => ({
  type: REGISTRY_CHALLENGE_ERROR,
  payload: value,
})

export const registryChallengeReset = (): FSA => ({
  type: REGISTRY_CHALLENGE_RESET,
  payload: {},
})

