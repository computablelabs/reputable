// Local Dependencies
import { FSA, StateItem, Deployed } from '../../interfaces'
import {
  WEBSOCKET_ADDRESS_SET,
  RESET_WEBSOCKET_ADDRESS,
} from '../action-creators/web3'
import createReducer from './createReducer'

const initialState: StateItem<Deployed> = {
  loading: false,
  request: {},
  data: { address: '' },
  error: undefined,
}

const handlers = {
  // Address
  [WEBSOCKET_ADDRESS_SET]: (state: StateItem<Deployed>, { payload }: FSA) => ({
    ...state,
    loading: false,
    data: {
      address: payload.address,
    },
  }),
  [RESET_WEBSOCKET_ADDRESS]: () => ({
    ...initialState,
  })
}

export default createReducer(handlers, initialState)

