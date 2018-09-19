// Dependencies
import Registry from 'computable/dist/contracts/registry'

// Local Dependencies
import { State } from '../../../interfaces'
import { getRegistryContract } from '../../contracts'
import { registryListingRequest, registryListingError } from './actions'

/* Action Creators */
const updateListingStatus = (listingHash: string): any => (
  async (dispatch: Function, getState: Function): Promise<void> => {
    const state: State = getState()

    const args = { listingHash }
    dispatch(registryListingRequest(args))

    try {
      const registry: Registry = await getRegistryContract(state)
      await registry.updateStatus(listingHash)
    } catch (err) {
      dispatch(registryListingError(err))
    }
  }
)

export { updateListingStatus }

