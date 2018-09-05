import {
  State,
  StateItem,
  Registry,
  Listing,
} from '../../interfaces'

const model = 'registry'

const getRegistry = (state: State = {}): Registry|undefined => {
  const stateItem: StateItem<Registry>|undefined = state[model]
  if (!stateItem) {
    return undefined
  }

  return stateItem.data
}

const getRegistryAddress = (state: State = {}): string => {
  const registry: Registry|undefined = getRegistry(state)
  if (!registry || !registry.address) {
    return ''
  }

  return registry.address
}

const getListings = (state: State = {}): Listing[] => {
  const registry: Registry|undefined = getRegistry(state)
  if (!registry) {
    return []
  }

  if (!registry.listings) {
    return []
  }

  return Object.values(registry.listings)
}

const getListing = (state: State = {}, key: string): Listing|undefined => {
  const registry: Registry|undefined = getRegistry(state)
  if (!registry) {
    return undefined
  }

  if (!registry.listings) {
    return undefined
  }

  return registry.listings[key]
}

const getAppliedListings = (state: State = {}): Listing[] => {
  const listings: Listing[] = getListings(state)

  return listings.filter(
    (listing) => !listing.whitelisted
  )
}

const getWhitelistedListings = (state: State = {}): Listing[] => {
  const listings: Listing[] = getListings(state)

  return listings.filter(
    (listing) => listing.whitelisted
  )
}

export {
  getRegistry,
  getRegistryAddress,
  getListings,
  getListing,
  getAppliedListings,
  getWhitelistedListings,
}

