import { Erc20DeployParams } from 'computable/dist/interfaces'
import {
  Action,
  FSA,
  State,
  Deployed,
  Participant,
} from '../../../interfaces'
import { TokenDefaults, Errors } from '../../../constants'
import { getWebsocketAddress, getOwner } from '../../selectors'
import { getWeb3, getTokenContract } from '../../../helpers'

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

    const owner: Participant|undefined = getOwner(state)
    if (!owner) {
      dispatch(tokenDeployError(new Error(Errors.NO_ADMIN_FOUND)))
    }

    let web3
    const websocketAddress: string = getWebsocketAddress(state)
    try {
      web3 = await getWeb3(websocketAddress)
    } catch (err) {
      dispatch(tokenDeployError(err))

      return ''
    }

    const contract = await getTokenContract({ web3, owner })
    try {
      supply = supply || TokenDefaults.SUPPLY
      const tokenAddress = await contract.deploy(web3, {
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
  async (dispatch: Function, getState: Function): Promise<void> => (
    dispatch(tokenAddressOk({ address: tokenAddress }))
  )
)

/* To reset the stored Token Contract address + supply */
const resetTokenAddress = (): any => (
  async (dispatch: Function, getState: Function): Promise<Action> => (
    dispatch(tokenAddressReset())
  )
)

export { deployToken, setTokenAddress, resetTokenAddress }

