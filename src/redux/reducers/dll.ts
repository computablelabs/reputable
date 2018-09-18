// Local Dependencies
import { FSA, StateItem, Deployed } from '../../interfaces'
import {
  DLL_RESET,

  DLL_DEPLOY_REQUEST,
  DLL_DEPLOY_OK,
  DLL_DEPLOY_ERROR,

  DLL_ADDRESS_OK,
  DLL_ADDRESS_RESET,
} from '../action-creators/dll'
import createReducer from './createReducer'

const initialState: StateItem<Deployed> = {
  loading: false,
  request: {},
  data: { address: '' },
  error: undefined,
}

const handlers = {
  // General
  [DLL_RESET]: () => ({
    ...initialState,
  }),

  // Deploy
  [DLL_DEPLOY_REQUEST]: (state: StateItem<Deployed>, { payload }: FSA) => ({
    ...state,
    loading: true,
    request: payload,
  }),
  [DLL_DEPLOY_OK]: (state: StateItem<Deployed>, { payload }: FSA) => ({
    ...state,
    loading: false,
    data: {
      ...state.data,
      address: payload.address,
    },
  }),
  [DLL_DEPLOY_ERROR]: (state: StateItem<Deployed>, { payload }: FSA) => ({
    ...state,
    loading: false,
    error: payload.toString(),
  }),

  // Address
  [DLL_ADDRESS_OK]: (state: StateItem<Deployed>, { payload }: FSA) => ({
    ...state,
    loading: false,
    data: {
      ...state.data,
      address: payload.address,
    },
  }),
  [DLL_ADDRESS_RESET]: (state: StateItem<Deployed>, { payload }: FSA) => ({
    ...state,
    laoding: initialState.loading,
    request: initialState.request,
    error: initialState.error,
    data: {
      ...state.data,
      address: initialState.data.address,
    },
  }),
}

export default createReducer(handlers, initialState)

