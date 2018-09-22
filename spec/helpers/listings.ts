// Local Dependencies
import { State, Listing } from '../../src/interfaces'
import store from '../../src/redux/store'
import { applyListing } from '../../src/redux/action-creators/registry'
import { getListings } from '../../src/redux/selectors'

const createListing = async (userAddress: string) => {
  let state: State = store.getState()
  let originalListings: Listing[] = getListings(state)
  let hashes: string[] = originalListings.map((item) => item.listingHash)

  // generate a random listing value
  const listing: string = 'listing ' + Math.floor(Math.random() * 1000 * 1000).toString()
  const data = { value: 'data value' }

  await store.dispatch(
    applyListing({ listing, userAddress, deposit: 100, data })
  )

  state = store.getState()
  const listings: Listing[] = getListings(state)
  const newListing: Listing|undefined = listings.find(
    (item) => !hashes.includes(item.listingHash)
  )

  if (!newListing) {
    return {}
  }

  return {
    listingHash: newListing.listingHash,
    data: newListing.data,
  }
}

export { createListing }

