// Dependencies
import Registry from 'computable/dist/contracts/registry'
import { TransactionReceipt } from 'web3/types'

// Local Dependencies
import { State } from '../../../interfaces'
import { getRegistryContract } from '../../contracts'
import { registryListingRequest, registryListingError } from './actions'

/* Action Creators */
const updateListingStatus = (listingHash: string): any => (
  async (dispatch: Function, getState: Function): Promise<TransactionReceipt|void> => {
    const state: State = getState()

    const args = { listingHash }
    dispatch(registryListingRequest(args))

    try {
      const registry: Registry = await getRegistryContract(state)
      const tx: TransactionReceipt = await registry.updateStatus(listingHash)

      return tx
    } catch (err) {
      dispatch(registryListingError(err))
    }
  }
)

export { updateListingStatus }

