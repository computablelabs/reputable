// Local Dependencies
import { Action } from '../../../interfaces'
import {
  websocketAddressOk,
  websocketAddressReset,
} from './actions'

/* Action Creators */
const setWebsocketAddress = (address: string): any => (
  async (dispatch: Function): Promise<Action> => (
    dispatch(websocketAddressOk({ address }))
  )
)

const resetWebsocketAddress = (): any => (
  async (dispatch: Function): Promise<Action> => (
    dispatch(websocketAddressReset())
  )
)

export { setWebsocketAddress, resetWebsocketAddress }

