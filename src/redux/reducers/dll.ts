import { FSA, StateItem, Deployed } from '../../interfaces'
import {
  DLL_REQUEST,
  DLL_OK,
  DLL_ERROR,
  DLL_RESET,
} from '../action-creators/dll'
import createReducer from './createReducer'

const initialState: StateItem<Deployed> = {
  loading: false,
  request: {},
  data: { address: '' },
  error: undefined,
}

const handlers = {
  [DLL_REQUEST]: (state: StateItem<Deployed>, { payload }: FSA) => ({
    ...state,
    loading: true,
    request: payload,
  }),
  [DLL_OK]: (state: StateItem<Deployed>, { payload }: FSA) => ({
    ...state,
    loading: false,
    data: {
      address: payload.address,
    },
  }),
  [DLL_ERROR]: (state: StateItem<Deployed>, { payload }: FSA) => ({
    ...state,
    loading: false,
    error: payload.toString(),
  }),
  [DLL_RESET]: () => ({
    ...initialState,
  }),
}

export default createReducer(handlers, initialState)

