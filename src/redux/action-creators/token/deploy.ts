// Dependencies
import Erc20 from 'computable/dist/contracts/erc-20'

// Local Dependencies
import { State, Participant } from '../../../interfaces'
import { Errors, TokenDefaults } from '../../../constants'
import { getWeb3 } from '../../../initializers'
import { getOwner, getWebsocketAddress } from '../../selectors'
import {
  tokenDeployRequest,
  tokenDeployOk,
  tokenDeployError,
} from './actions'

/* Action Creators */
const deployToken = (supply?: number): any => (
  async (dispatch: Function, getState: Function): Promise<void> => {
    const state:State = getState()

    const args = { address: undefined, supply }
    dispatch(tokenDeployRequest(args))

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
      const contract = new Erc20(owner.address)

      supply = supply || TokenDefaults.SUPPLY

      // TODO remove `supply` from global state
      const tokenAddress: string = await contract.deploy(web3, {
        address: owner.address,
        supply,
      })

      dispatch(tokenDeployOk({ address: tokenAddress, supply }))
    } catch(err) {
      dispatch(tokenDeployError(err))
    }
  }
)

export { deployToken }

