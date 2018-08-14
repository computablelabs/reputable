import {
  FSA,
  StateItem,
  Transfer,
} from '../../interfaces'
import {
  TOKEN_TRANSFER_REQUEST,
  TOKEN_TRANSFER_OK,
  TOKEN_TRANSFER_ERROR,
  TOKEN_TRANSFER_RESET,
} from '../action-creators/token/transfer'
import createReducer from './createReducer'

const initialState: StateItem<Transfer> = {
  loading: false,
  request: {},
  data: {},
  error: undefined,
}

const handlers = {
  [TOKEN_TRANSFER_REQUEST]: (state: StateItem<Transfer>, { payload }: FSA) => ({
    ...state,
    loading: true,
    request: payload,
  }),
  [TOKEN_TRANSFER_OK]: (state: StateItem<Transfer>, { payload }: FSA) => ({
    ...state,
    loading: false,
    data: {
      ...state.data,
      [payload.id]: payload,
    },
  }),
  [TOKEN_TRANSFER_ERROR]: (state: StateItem<Transfer>, { payload }: FSA) => ({
    ...state,
    loading: false,
    error: payload.toString(),
  }),
  [TOKEN_TRANSFER_RESET]: (state: StateItem<Transfer>, { payload }: FSA) => ({
    ...initialState,
  }),
}

export default createReducer(handlers, initialState)

