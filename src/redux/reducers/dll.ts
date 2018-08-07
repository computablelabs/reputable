import {
  FSA,
  StateItem,
} from '../../interfaces'
import {
  DLL_REQUEST,
  DLL_OK,
  DLL_ERROR,
  DLL_RESET,
} from '../action-creators/dll'
import createReducer from './createReducer'

const initialState: StateItem<string> = {
  loading: false,
  request: {},
  data: {},
  error: undefined,
}

const handlers = {
  [DLL_REQUEST]: (state: StateItem<string>, { payload }: FSA) => ({
    ...state,
    isLoading: true,
    request: payload,
  }),
  [DLL_OK]: (state: StateItem<string>, { payload }: FSA) => ({
    ...state,
    loading: false,
    data: {
      [payload.address]: payload.address,
    },
  }),
  [DLL_ERROR]: (state: StateItem<string>, { payload }: FSA) => ({
    ...state,
    loading: false,
    error: payload,
  }),
  [DLL_RESET]: (state: StateItem<string>, { payload }: FSA) => ({
    ...initialState,
  }),
}

export default createReducer(handlers, initialState)

