import { FSA, StateItem, GenericMap } from '../../interfaces'
import {
  WEBSOCKET_ADDRESS_SET,
  RESET_WEBSOCKET_ADDRESS,
} from '../action-creators/web3'
import createReducer from './createReducer'

const initialState: StateItem<GenericMap<string>> = {
  loading: false,
  request: {},
  data: {},
  error: undefined,
}

const handlers = {
  [WEBSOCKET_ADDRESS_SET]: (state: StateItem<GenericMap<string>>, { payload }: FSA) => ({
    ...state,
    loading: false,
    data: {
      ...state.data,
      ...payload,
    },
  }),
  [RESET_WEBSOCKET_ADDRESS]: () => ({
    ...initialState,
  })
}

export default createReducer(handlers, initialState)

