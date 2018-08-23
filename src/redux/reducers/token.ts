import {
  FSA,
  StateItem,
  Token,
} from '../../interfaces'
import {
  TOKEN_DEPLOY_REQUEST,
  TOKEN_DEPLOY_OK,
  TOKEN_DEPLOY_ERROR,

  TOKEN_ADDRESS_OK,
  TOKEN_ADDRESS_RESET,
} from '../action-creators/token/deploy'
import createReducer from './createReducer'

const initialState: StateItem<Token> = {
  loading: false,
  request: {},
  data: {
    address: undefined,
    supply: undefined,
    approvals: [],
    transfers: [],
  },
  error: undefined,
}

const handlers = {
  [TOKEN_DEPLOY_REQUEST]: (state: StateItem<Token>, { payload }: FSA) => ({
    ...state,
    loading: true,
    request: payload,
  }),
  [TOKEN_DEPLOY_OK]: (state: StateItem<Token>, { payload }: FSA) => ({
    ...state,
    loading: false,
    data: {
      ...state.data,
      address: payload.address,
      supply: payload.supply,
    },
  }),
  [TOKEN_DEPLOY_ERROR]: (state: StateItem<Token>, { payload }: FSA) => ({
    ...state,
    loading: false,
    error: payload.toString(),
  }),
  [TOKEN_ADDRESS_OK]: (state: StateItem<Token>, { payload }: FSA) => ({
    ...state,
    loading: false,
    data: {
      ...state.data,
      address: payload.address,
    },
  }),
  [TOKEN_ADDRESS_RESET]: (state: StateItem<Token>) => ({
    ...state,
    data: {
      ...state.data,
      address: initialState.data.address,
      supply: initialState.data.supply,
    },
  })
}

export default createReducer(handlers)

