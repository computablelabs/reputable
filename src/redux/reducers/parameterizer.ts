import { FSA, StateItem, Deployed } from '../../interfaces'
import {
  PARAMETERIZER_DEPLOY_REQUEST,
  PARAMETERIZER_DEPLOY_OK,
  PARAMETERIZER_DEPLOY_ERROR,

  PARAMETERIZER_ADDRESS_OK,
  PARAMETERIZER_ADDRESS_RESET,
} from '../action-creators/parameterizer'
import createReducer from './createReducer'

const initialState: StateItem<Deployed> = {
  loading: false,
  request: {},
  data: { address: '' },
  error: undefined,
}

const handlers = {
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
    data: {
      ...state.data,
      address: initialState.data.address,
    },
  }),
}

export default createReducer(handlers, initialState)

