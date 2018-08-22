import { FSA, StateItem, Map } from '../../interfaces'
import {
  DLL_REQUEST,
  DLL_OK,
  DLL_ERROR,
  DLL_RESET,
} from '../action-creators/dll'
import createReducer from './createReducer'

const initialState: StateItem<Map> = {
  loading: false,
  request: {},
  data: {},
  error: undefined,
}

const handlers = {
  [DLL_REQUEST]: (state: StateItem<Map>, { payload }: FSA) => ({
    ...state,
    loading: true,
    request: payload,
  }),
  [DLL_OK]: (state: StateItem<Map>, { payload }: FSA) => ({
    ...state,
    loading: false,
    data: {
      [payload.address]: payload.address,
    },
  }),
  [DLL_ERROR]: (state: StateItem<Map>, { payload }: FSA) => ({
    ...state,
    loading: false,
    error: payload.toString(),
  }),
  [DLL_RESET]: () => ({
    ...initialState,
  }),
}

export default createReducer(handlers, initialState)

