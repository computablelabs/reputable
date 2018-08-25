import Registry from 'computable/dist/contracts/registry'
import {
  Action,
  FSA,
  State,
  Map,
  Deployed,
  Participant,
} from '../../../interfaces'
import { Errors } from '../../../constants'
import { getWeb3 } from '../../../initializers'
import { address as getVotingAddress } from '../../selectors/voting'
import {
  getWebsocketAddress,
  getOwner,
  getTokenAddress,
  getParameterizerAddress,
} from '../../selectors'

// Action Types
export const REGISTRY_DEPLOY_REQUEST = 'REGISTRY_DEPLOY_REQUEST'
export const REGISTRY_DEPLOY_OK = 'REGISTRY_DEPLOY_OK'
export const REGISTRY_DEPLOY_ERROR = 'REGISTRY_DEPLOY_ERROR'

export const REGISTRY_ADDRESS_OK = 'REGISTRY_ADDRESS_OK'
export const REGISTRY_ADDRESS_RESET = 'REGISTRY_ADDRESS_RESET'

// Actions
const registryDeployRequest = (value: Map): FSA => ({
  type: REGISTRY_DEPLOY_REQUEST,
  payload: value,
})

const registryDeployOk = (value: Deployed): FSA => ({
  type: REGISTRY_DEPLOY_OK,
  payload: value
})

const registryDeployError = (value: Error): FSA => ({
  type: REGISTRY_DEPLOY_ERROR,
  payload: value,
})

const registryAddressOk = (value: Deployed): FSA => ({
  type: REGISTRY_ADDRESS_OK,
  payload: value,
})

const registryAddressReset = (): FSA => ({
  type: REGISTRY_ADDRESS_RESET,
  payload: {},
})

// Action Creators
/* To deploy a new Registry Contract */
const deployRegistry = (name:string): any => (
  async (dispatch:any, getState:any): Promise<string> => {
    const state:State = getState()

    const args = { name }
    dispatch(registryDeployRequest(args))

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

      const tokenAddress: string = getTokenAddress(state)
      if (!tokenAddress) {
        throw new Error(Errors.NO_TOKEN_FOUND)
      }

      const votingAddress: string = getVotingAddress(state)
      if (!votingAddress) {
        throw new Error(Errors.NO_VOTING_FOUND)
      }

      const parameterizerAddress: string = getParameterizerAddress(state)
      if (!parameterizerAddress) {
        throw new Error(Errors.NO_PARAMETERIZER_FOUND)
      }

      const contract = new Registry(owner.address)

      const registryAddress: string = await contract.deploy(web3, {
        name,
        tokenAddress,
        votingAddress,
        parameterizerAddress,
      })

      dispatch(registryDeployOk({ address: registryAddress }))

      return registryAddress
    } catch(err) {
      dispatch(registryDeployError(err))

      return ''
    }
  }
)

/* To store the address of an already deployed Registry Contract */
const setRegistryAddress = (registryAddress: string): any => (
  async (dispatch: Function): Promise<void> => (
    dispatch(registryAddressOk({ address: registryAddress }))
  )
)

/* To reset the stored Registry Contract address */
const resetRegistryAddress = (): any => (
  async (dispatch: Function): Promise<Action> => (
    dispatch(registryAddressReset())
  )
)

export { deployRegistry, setRegistryAddress, resetRegistryAddress }

