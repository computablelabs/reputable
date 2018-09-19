// Dependencies
import Registry from 'computable/dist/contracts/registry'

// Local Dependencies
import { State, Listing } from '../../../interfaces'
import { getRegistryContract } from '../../contracts'
import {
  registryListingRequest,
  registryListingOk,
  registryListingError,
  registryListingReset,
} from './actions'

/* Action Creators */
const fetchListing = (listingHash: string): any => (
  async (dispatch: Function, getState: Function): Promise<void> => {
    const state: State = getState()

    const args = { listingHash }
    dispatch(registryListingRequest(args))

    try {
      const registry: Registry = await getRegistryContract(state)
      const listing: Listing = await registry.listings(listingHash) as Listing

      const out = {
        listingHash,
        applicationExpiry: listing.applicationExpiry,
        whitelisted: listing.whitelisted,
        challenge: listing.challenge,
        owner: listing.owner,
        unstakedDeposit: listing.unstakedDeposit,
      }

      dispatch(registryListingOk(out))
    } catch (err) {
      dispatch(registryListingError(err))
    }
  }
)

const resetRegistryListings = (): any => (
  async (dispatch: Function): Promise<void> => {
    dispatch(registryListingReset())
  }
)

export {
  fetchListing,
  resetRegistryListings,
}

