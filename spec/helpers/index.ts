import store from '../../src/redux/store'
import { applyListing } from '../../src/redux/action-creators/registry'


const createListing = async (userAddress: string) => {
  // generate a random listing value
  const listing: string = 'listing ' + Math.floor(Math.random() * 1000 * 1000).toString()
  const data = { value: 'data value' }

  const txValues = await store.dispatch(
    applyListing({ listing, userAddress, deposit: 100, data })
  )

  const listingHash: string = txValues.listingHash

  return { listingHash, data }
}

export {
  createListing,
}

