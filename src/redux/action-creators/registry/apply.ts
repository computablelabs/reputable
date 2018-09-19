// Dependencies
import Registry from 'computable/dist/contracts/registry'

// Local Dependencies
import { State, ApplicantData } from '../../../interfaces'
import { encodeData } from '../../../helpers/data'
import { getWeb3, getRegistryContract } from '../../contracts'
import { registryApplyRequest, registryApplyError } from './actions'

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
  async (dispatch: Function, getState: Function): Promise<void> => {
    const state: State = getState()

    const args = { listing, userAddress, deposit, data }
    dispatch(registryApplyRequest(args))

    try {
      const web3 = await getWeb3(state)
      const registry: Registry = await getRegistryContract(state)

      const encodedListing: string = web3.utils.toHex(listing)
      const stringifiedData: string = await encodeData(data || { value: '' })

      await registry.apply(
        encodedListing,
        deposit,
        stringifiedData,
        { from: userAddress },
      )
    } catch (err) {
      dispatch(registryApplyError(err))
    }
  }
)

export { applyListing }

