// Dependencies
import Registry from '@computable/computablejs/dist/contracts/registry'
import { TransactionReceipt } from 'web3/types'

// Local Dependencies
import { State, ApplicantData } from '../../../interfaces'
import { encodeData } from '../../../helpers/data'
import { getWeb3, getRegistryContract } from '../../contracts'
import {
  registryApplyRequest,
  registryApplyError,

  registryRemoveRequest,
  registryRemoveError,
} from './actions'

/* Action Creators */
interface RegistryApplyParams {
  listing:     string
  userAddress: string
  deposit:     number
  data?:       ApplicantData
}
const applyListing = ({
  listing,
  userAddress,
  deposit,
  data,
}: RegistryApplyParams): any => (
  async (dispatch: Function, getState: Function): Promise<TransactionReceipt|void> => {
    const state: State = getState()

    const args = { listing, userAddress, deposit, data }
    dispatch(registryApplyRequest(args))

    try {
      const web3 = await getWeb3(state)
      const registry: Registry = await getRegistryContract(state)

      const encodedListing: string = web3.utils.toHex(listing)
      const stringifiedData: string = await encodeData(data || { value: '' })

      const tx: TransactionReceipt = await registry.apply(
        web3,
        encodedListing,
        deposit,
        stringifiedData,
        { from: userAddress },
      )

      return tx
    } catch (err) {
      dispatch(registryApplyError(err))
    }
  }
)

interface RegistryRemoveParams {
  listing:     string
  userAddress: string
}
const removeListing = ({ listing, userAddress }: RegistryRemoveParams): any => (
  async (dispatch: Function, getState: Function): Promise<TransactionReceipt|void> => {
    const state: State = getState()

    const args = { listing, userAddress }
    dispatch(registryRemoveRequest(args))

    try {
      const web3 = await getWeb3(state)
      const registry: Registry = await getRegistryContract(state)

      const tx: TransactionReceipt = await registry.exit(web3, listing, { from: userAddress })

      return tx
    } catch (err) {
      dispatch(registryRemoveError(err))
    }
  }
)

export { applyListing, removeListing }

