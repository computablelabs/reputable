import Web3 from 'web3'
import store from '../store'
import { Nos } from 'computable/dist/types'
import Erc20 from 'computable/dist/contracts/erc-20'
import { Errors } from '../../constants'
import { State, Participant } from '../../interfaces'
import {
  deployToken as deploy,
  deployedToken,
  tokenDeployError,
  resetToken as reset,
} from '../action-creators/token'
/**
 * @param address. Optional address of the owner of the initial supply, defaults to token default account
 * @param supply. Optional amount of funds the token holds, defaults to const TokenDefaults
 */
const deployToken = async (address?:string, supply?:Nos): Promise<string> => {
  // assure that we have an admin
  const state:State = store.getState(),
    web3:Web3|undefined = state.web3,
    admin:Participant|undefined = state.participants && state.participants[0]

  // TODO should we just dispatch here?
  if (!web3) throw Errors.NO_WEB3_FOUND // TODO we could make helpers for checks like this, may be common...
  if (!admin) throw Errors.NO_ADMIN_FOUND

  /**
   * we'll optimistically store the data from the dispatch. this does create two sources of
   * truth (on chain vs our local state). for this demo that's OK but you could easily decide
   * to be pessimistic and just fetch the date from on-chain on-demand.
   *
   * also note that we are storing these things in local state, but could opt to just store
   * the address and little else (this would be an complete pessimistic approach)
   *
   * it may be a good pattern in general to be optimistic when possible, considering on-chain
   * transaction times (and sometimes cost) can be high. TDB...
   */
  const deployAction = deploy(address || admin.address)
  store.dispatch(deployAction)

  const contract = new Erc20(address)
  let tokenAddress:string = ''

  try {
    // we can just re-use our deploy action payload from above
    tokenAddress = await contract.deploy(web3, deployAction.payload)
  } catch (err) {
    store.dispatch(tokenDeployError(err))
  }

  store.dispatch(deployedToken(tokenAddress, contract))

  // it's likely this return won't be used, but may as well return it just in case
  return tokenAddress
}

const resetToken = (): void => {
  store.dispatch(reset())
}

export { deployToken, resetToken }
