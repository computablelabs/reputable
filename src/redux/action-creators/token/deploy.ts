import Erc20 from 'computable/dist/contracts/erc-20'
import { Erc20DeployParams } from 'computable/dist/interfaces'
import {
  Action,
  FSA,
  State,
  Deployed,
  Participant,
} from '../../../interfaces'
import { Errors, TokenDefaults } from '../../../constants'
import { getWeb3 } from '../../../initializers'
import { getOwner, getWebsocketAddress } from '../../selectors'

// Action Types
export const TOKEN_DEPLOY_REQUEST = 'TOKEN_DEPLOY_REQUEST'
export const TOKEN_DEPLOY_OK = 'TOKEN_DEPLOY_OK'
export const TOKEN_DEPLOY_ERROR = 'TOKEN_DEPLOY_ERROR'

export const TOKEN_ADDRESS_OK = 'TOKEN_ADDRESS_OK'
export const TOKEN_ADDRESS_RESET = 'TOKEN_ADDRESS_RESET'

// Actions
const tokenDeployRequest = (value: Erc20DeployParams): FSA => ({
  type: TOKEN_DEPLOY_REQUEST,
  payload: value,
})

const tokenDeployOk = (value: Erc20DeployParams): FSA => ({
  type: TOKEN_DEPLOY_OK,
  payload: value,
})

const tokenDeployError = (value: Error): FSA => ({
  type: TOKEN_DEPLOY_ERROR,
  payload: value,
})

const tokenAddressOk = (value: Deployed): FSA => ({
  type: TOKEN_ADDRESS_OK,
  payload: value,
})

const tokenAddressReset = (): FSA => ({
  type: TOKEN_ADDRESS_RESET,
  payload: {},
})


// Action Creators
/* To deploy a new Token Contract */
const deployToken = (supply?: number): any => (
  async (dispatch: Function, getState: Function): Promise<string> => {
    const state:State = getState()

    const args = { address: undefined, supply }
    dispatch(tokenDeployRequest(args))

    try {
      const owner: Participant = getOwner(state)
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

      return tokenAddress
    } catch(err) {
      dispatch(tokenDeployError(err))

      return ''
    }
  }
)

/* To store the address of an already deployed Token Contract */
// TODO
//    If we set the contract address of an existing token, when do we set the
//    supply value? Do we need the supply in global state?
const setTokenAddress = (tokenAddress: string): any => (
  async (dispatch: Function): Promise<void> => (
    dispatch(tokenAddressOk({ address: tokenAddress }))
  )
)

/* To reset the stored Token Contract address + supply */
const resetTokenAddress = (): any => (
  async (dispatch: Function): Promise<Action> => (
    dispatch(tokenAddressReset())
  )
)

export { deployToken, setTokenAddress, resetTokenAddress }

