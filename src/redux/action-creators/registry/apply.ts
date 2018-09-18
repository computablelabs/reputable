// Dependencies
import Registry from 'computable/dist/contracts/registry'

// Local Dependencies
import {
  EventEmitter,
  EventLog,
  Map,
  State,
  Participant,
  ApplicantData,
} from '../../../interfaces'
import { Errors } from '../../../constants'
import { getWeb3 } from '../../../initializers'
import { encodeData, decodeData } from '../../../helpers/data'
import { getWebsocketAddress, getOwner, getRegistryAddress } from '../../selectors'
import {
  registryApplyRequest,
  registryApplyOk,
  registryApplyError,
} from './actions'

/* Action Creators */
interface RegistryApplyParams {
  listing: string
  userAddress: string
  deposit: number
  data?: ApplicantData
}
const applyListing = ({
  listing,
  userAddress,
  deposit,
  data,
}: RegistryApplyParams): any => (
  async (dispatch: Function, getState: Function): Promise<Map|undefined> => {
    const state: State = getState()

    const args = { listing, userAddress, deposit, data }
    dispatch(registryApplyRequest(args))

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

      let out: any = {}

      const emitter: EventEmitter = registry.getEventEmitter('_Application') as EventEmitter
      emitter.on('data', async (log: EventLog) => {
        const eventValues = log.returnValues

        out = {
          listingHash: eventValues.listingHash,
          applicationExpiry: eventValues.appEndDate,
          whitelisted: false,
          owner: eventValues.applicant,
          unstakedDeposit: eventValues.deposit,
          data: await decodeData(eventValues.data),
        }

        dispatch(registryApplyOk(out))
      })

      const encodedListing: string = web3.utils.toHex(listing)
      const stringifiedData: string = await encodeData(data || { value: '' })

      await registry.apply(
        encodedListing,
        deposit,
        stringifiedData,
        { from: userAddress },
      )

      emitter.unsubscribe()

      return out
    } catch (err) {
      dispatch(registryApplyError(err))

      return undefined
    }
  }
)

export { applyListing }

