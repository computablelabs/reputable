import Web3 from 'web3'
import store from '../store'
import { Nos } from 'computable/dist/types'
import Erc20 from 'computable/dist/contracts/erc-20'
import {
  State,
  Action,
  Participant,
  DeployToken,
  DeployedToken,
} from '../../interfaces'
import {
  DEPLOY_TOKEN,
  DEPLOYED_TOKEN,
  RESET_TOKEN,
  TokenDefaults,
  Errors,
} from '../../constants'
/**
 * @param address. Optional address of the owner of the initial supply, defaults to token default account
 * @param supply. Optional amount of funds the token holds, defaults to const TokenDefaults
 */
const deployToken = async (address?:string, supply?:Nos): Promise<string> => {
  // assure that we have an admin
  const state:State = store.getState(),
    web3:Web3|undefined = state.web3,
    admin:Participant|undefined = state.participants && state.participants[0]

  if (!web3) throw Errors.NO_WEB3_FOUND // TODO we could make helpers for checks like this, may be common...
  if (!admin) throw Errors.NO_ADMIN_FOUND

  const deploy:DeployToken = {
    type: DEPLOY_TOKEN,
    address: address || admin.address,
    supply: supply || TokenDefaults.SUPPLY,
  }

  // TODO setup defaults for the "ContractOpts" object

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
  store.dispatch(deploy)

  const contract = new Erc20(address),
    // we can just re-use our deploy object from above (type will be ignored)
    tokenAddress:string = await contract.deploy(web3, deploy)

  const deployed:DeployedToken = { type: DEPLOYED_TOKEN, address: tokenAddress, contract }
  store.dispatch(deployed)

  return tokenAddress
}

const resetToken = (): void => {
  const o:Action = { type: RESET_TOKEN }
  store.dispatch(o)
}

export { deployToken, resetToken }
