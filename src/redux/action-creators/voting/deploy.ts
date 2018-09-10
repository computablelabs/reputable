import Voting from 'computable/dist/contracts/plcr-voting'
import {
  Action,
  State,
  Participant,
} from '../../../interfaces'
import { Errors } from '../../../constants'
import {
  getWebsocketAddress,
  getOwner,
  getTokenAddress,
  getDllAddress,
  getAttributeStoreAddress,
} from '../../selectors'
import { getWeb3 } from '../../../initializers'
import {
  votingDeployRequest,
  votingDeployOk,
  votingDeployError,

  votingAddressOk,
  votingAddressReset,
} from './actions'

/* Action Creators */
// To deploy a new Voting Contract
const deployVoting = (): any => (
  async (dispatch: Function, getState: Function): Promise<string> => {
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

      return votingAddress
    } catch (err) {
      dispatch(votingDeployError(err))

      return ''
    }
  }
)

// To store the address of an already deployed Voting Contract
const setVotingAddress = (votingAddress: string): any => (
  async (dispatch: Function): Promise<Action> => (
    dispatch(votingAddressOk({ address: votingAddress }))
  )
)

// To reset the stored Voting Contract address
const resetVotingAddress = (): any => (
  async (dispatch: Function): Promise<Action> => (
    dispatch(votingAddressReset())
  )
)

export { deployVoting, setVotingAddress, resetVotingAddress }

