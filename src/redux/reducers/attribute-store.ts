// Local Dependencies
import { FSA, StateItem, Deployed } from '../../interfaces'
import {
  ATTRIBUTE_STORE_RESET,

  ATTRIBUTE_STORE_DEPLOY_REQUEST,
  ATTRIBUTE_STORE_DEPLOY_OK,
  ATTRIBUTE_STORE_DEPLOY_ERROR,

  ATTRIBUTE_STORE_ADDRESS_OK,
  ATTRIBUTE_STORE_ADDRESS_RESET,
} from '../action-creators/attribute-store'
import createReducer from './createReducer'

const initialState: StateItem<Deployed> = {
  loading: false,
  request: {},
  data: { address: '' },
  error: undefined,
}

const handlers = {
  // General
  [ATTRIBUTE_STORE_RESET]: () => ({
    ...initialState,
  }),

  // Deploy
  [ATTRIBUTE_STORE_DEPLOY_REQUEST]: (state: StateItem<Deployed>, { payload }: FSA) => ({
    ...state,
    loading: true,
    request: payload,
  }),
  [ATTRIBUTE_STORE_DEPLOY_OK]: (state: StateItem<Deployed>, { payload }: FSA) => ({
    ...state,
    loading: false,
    data: {
      ...state.data,
      address: payload.address,
    },
  }),
  [ATTRIBUTE_STORE_DEPLOY_ERROR]: (state: StateItem<Deployed>, { payload }: FSA) => ({
    ...state,
    loading: false,
    error: payload.toString(),
  }),

  // Address
  [ATTRIBUTE_STORE_ADDRESS_OK]: (state: StateItem<Deployed>, { payload }: FSA) => ({
    ...state,
    loading: false,
    data: {
      ...state.data,
      address: payload.address,
    },
  }),
  [ATTRIBUTE_STORE_ADDRESS_RESET]: (state: StateItem<Deployed>, { payload }: FSA) => ({
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

