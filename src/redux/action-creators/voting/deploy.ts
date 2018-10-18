// Dependencies
import Voting from '@computable/computablejs/dist/contracts/plcr-voting'

// Local Dependencies
import { State, Participant } from '../../../interfaces'
import { Errors } from '../../../constants'
import { getWeb3 } from '../../../initializers'
import {
  getWebsocketAddress,
  getOwner,
  getTokenAddress,
  getDllAddress,
  getAttributeStoreAddress,
} from '../../selectors'
import {
  votingDeployRequest,
  votingDeployOk,
  votingDeployError,
} from './actions'

/* Action Creators */
const deployVoting = (): any => (
  async (dispatch: Function, getState: Function): Promise<void> => {
    const state: State = getState()

    const args = {}
    dispatch(votingDeployRequest(args))

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

      const tokenAddress: string = getTokenAddress(state)
      if (!tokenAddress) {
        throw new Error(Errors.NO_TOKEN_FOUND)
      }

      const dllAddress: string = getDllAddress(state)
      if (!dllAddress) {
        throw new Error(Errors.NO_DLL_FOUND)
      }

      const attributeStoreAddress: string = getAttributeStoreAddress(state)
      if (!attributeStoreAddress) {
        throw new Error(Errors.NO_ATTRIBUTESTORE_FOUND)
      }

      const contract = new Voting(owner.address)
      const votingAddress: string = await contract.deploy(web3, {
        tokenAddress,
        dllAddress,
        attributeStoreAddress,
      })

      dispatch(votingDeployOk({ address: votingAddress }))
    } catch (err) {
      dispatch(votingDeployError(err))
    }
  }
)

export { deployVoting }

