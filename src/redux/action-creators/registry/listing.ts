// Dependencies
import Registry from 'computable/dist/contracts/registry'

// Local Dependencies
import {
  Map,
  State,
  Participant,
  Listing,
} from '../../../interfaces'
import { Errors } from '../../../constants'
import { getWeb3 } from '../../../initializers'
import { getWebsocketAddress, getOwner, getRegistryAddress } from '../../selectors'
import {
  registryListingRequest,
  registryListingOk,
  registryListingError,
  registryListingReset,
} from './actions'

/* Action Creators */
const fetchListing = (listingHash: string): any => (
  async (dispatch: Function, getState: Function): Promise<Map|undefined> => {
    const state: State = getState()

    const args = { listingHash }
    dispatch(registryListingRequest(args))

    try {
      const owner: Participant|undefined = getOwner(state)
      if (!owner) {
        throw new Error(Errors.NO_ADMIN_FOUND)
      }

      const websocketAddress: string = getWebsocketAddress(state)
      if (!websocketAddress) {
        throw new Error(Errors.NO_WEBSOCKETADDRESS_FOUND)
      }

      const web3 = await getWeb3(websocketAddress)

      const contractAddress: string = getRegistryAddress(state)
      if (!contractAddress) {
        throw new Error(Errors.NO_REGISTRY_FOUND)
      }

      const registry = new Registry(owner.address)
      await registry.at(web3, { address: contractAddress })

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

      return out
    } catch (err) {
      dispatch(registryListingError(err))

      return undefined
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

