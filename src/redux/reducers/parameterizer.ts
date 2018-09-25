// Local Dependencies
import { FSA, StateItem, Deployed } from '../../interfaces'
import {
  PARAMETERIZER_RESET,

  PARAMETERIZER_DEPLOY_REQUEST,
  PARAMETERIZER_DEPLOY_OK,
  PARAMETERIZER_DEPLOY_ERROR,

  PARAMETERIZER_ADDRESS_OK,
  PARAMETERIZER_ADDRESS_RESET,
} from '../action-creators/parameterizer'
import createReducer from './create-reducer'

const initialState: StateItem<Deployed> = {
  loading: false,
  request: {},
  data: { address: '' },
  error: undefined,
}

const handlers = {
  // General
  [PARAMETERIZER_RESET]: () => ({
    ...initialState,
  }),

  // Deploy
  [PARAMETERIZER_DEPLOY_REQUEST]: (state: StateItem<Deployed>, { payload }: FSA) => ({
    ...state,
    loading: true,
    request: payload,
  }),
  [PARAMETERIZER_DEPLOY_OK]: (state: StateItem<Deployed>, { payload }: FSA) => ({
    ...state,
    loading: false,
    data: {
      ...state.data,
      address: payload.address,
    },
  }),
  [PARAMETERIZER_DEPLOY_ERROR]: (state: StateItem<Deployed>, { payload }: FSA) => ({
    ...state,
    loading: false,
    error: payload.toString(),
  }),

  // Address
  [PARAMETERIZER_ADDRESS_OK]: (state: StateItem<Deployed>, { payload }: FSA) => ({
    ...state,
    loading: false,
    data: {
      ...state.data,
      address: payload.address,
    },
  }),
  [PARAMETERIZER_ADDRESS_RESET]: (state: StateItem<Deployed>, { payload }: FSA) => ({
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

