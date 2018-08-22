import {
  FSA,
  StateItem,
  GenericMap,
  Approval,
} from '../../interfaces'
import {
  TOKEN_APPROVE_REQUEST,
  TOKEN_APPROVE_OK,
  TOKEN_APPROVE_ERROR,
  TOKEN_APPROVE_RESET,
} from '../action-creators/token/approve'
import createReducer from './createReducer'

const initialState: StateItem<GenericMap<Approval>> = {
  loading: false,
  request: {},
  data: {},
  error: undefined,
}

const handlers = {
  [TOKEN_APPROVE_REQUEST]: (state: StateItem<GenericMap<Approval>>, { payload }: FSA) => ({
    ...state,
    loading: true,
    request: payload,
  }),
  [TOKEN_APPROVE_OK]: (state: StateItem<GenericMap<Approval>>, { payload }: FSA) => ({
    ...state,
    loading: false,
    data: {
      ...state.data,
      [payload.address]: payload,
    },
  }),
  [TOKEN_APPROVE_ERROR]: (state: StateItem<GenericMap<Approval>>, { payload }: FSA) => ({
    ...state,
    loading: false,
    error: payload.toString(),
  }),
  [TOKEN_APPROVE_RESET]: () => ({
    ...initialState,
  }),
}

export default createReducer(handlers, initialState)

