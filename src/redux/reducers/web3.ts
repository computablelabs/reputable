import { FSA, StateItem } from '../../interfaces'
import {
  WEBSOCKET_ADDRESS_SET,
  RESET_WEBSOCKET_ADDRESS,
} from '../action-creators/web3'
import createReducer from './createReducer'

const initialState: StateItem<string> = {
  loading: false,
  request: {},
  data: {},
  error: undefined,
}

const handlers = {
  [WEBSOCKET_ADDRESS_SET]: (state: StateItem<string>, { payload }: FSA) => ({
    ...state,
    loading: false,
    data: {
      [payload.address]: payload.address,
    },
  }),
  [RESET_WEBSOCKET_ADDRESS]: (state: StateItem<string>, { payload }: FSA) => ({
    ...initialState,
  })
}

export default createReducer(handlers, initialState)

