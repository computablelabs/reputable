// Local Dependencies
import {
  tokenAddressOk,
  tokenAddressReset,
} from './actions'

/* Action Creators */
// TODO
//    If we set the contract address of an existing token, when do we set the
//    supply value? Do we need the supply in global state?
const setTokenAddress = (tokenAddress: string): any => (
  async (dispatch: Function): Promise<void> => (
    dispatch(tokenAddressOk({ address: tokenAddress }))
  )
)

const resetTokenAddress = (): any => (
  async (dispatch: Function): Promise<void> => (
    dispatch(tokenAddressReset())
  )
)

export { setTokenAddress, resetTokenAddress }

