// Dependencies
import { Contract } from 'web3/types.d'
import { deployAttributeStore as deploy } from 'computable/dist/helpers'

// Local Dependencies
import { State, Participant } from '../../../interfaces'
import { Errors } from '../../../constants'
import { getWeb3 } from '../../../initializers'
import { getWebsocketAddress, getOwner } from '../../selectors'
import {
  attributeStoreDeployRequest,
  attributeStoreDeployOk,
  attributeStoreDeployError,
} from './actions'

/* Action Creators */
const deployAttributeStore = (): any => (
  async (dispatch: Function, getState: Function): Promise<void> => {
    const state: State = getState()

    const args = {}
    dispatch(attributeStoreDeployRequest(args))

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

      const contract: Contract = await deploy(web3, owner.address)

      // any raw web3.eth.Contract will have its address at
      // contract.options.address
      const contractAddress: string = contract.options.address

      dispatch(attributeStoreDeployOk({ address: contractAddress }))
    } catch (err) {
      dispatch(attributeStoreDeployError(err))
    }
  }
)

export { deployAttributeStore }

