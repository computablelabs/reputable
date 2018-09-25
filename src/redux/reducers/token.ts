// Local Dependencies
import {
  FSA,
  StateItem,
  Token,
} from '../../interfaces'
import {
  TOKEN_RESET,

  TOKEN_DEPLOY_REQUEST,
  TOKEN_DEPLOY_OK,
  TOKEN_DEPLOY_ERROR,

  TOKEN_ADDRESS_OK,
  TOKEN_ADDRESS_RESET,

  TOKEN_APPROVE_REQUEST,
  TOKEN_APPROVE_OK,
  TOKEN_APPROVE_ERROR,
  TOKEN_APPROVE_RESET,

  TOKEN_TRANSFER_REQUEST,
  TOKEN_TRANSFER_OK,
  TOKEN_TRANSFER_ERROR,
  TOKEN_TRANSFER_RESET,
} from '../action-creators/token'
import createReducer from './create-reducer'

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
  // General
  [TOKEN_RESET]: () => ({
    ...initialState,
  }),

  // Deploy
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

  // Address
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
  }),

  // Approve
  [TOKEN_APPROVE_REQUEST]: (state: StateItem<Token>, { payload }: FSA) => ({
    ...state,
    loading: true,
    request: payload,
  }),
  [TOKEN_APPROVE_OK]: (state: StateItem<Token>, { payload }: FSA) => ({
    ...state,
    loading: false,
    data: {
      ...state.data,
      approvals: [
        ...state.data.approvals || [],
        payload,
      ],
    },
  }),
  [TOKEN_APPROVE_ERROR]: (state: StateItem<Token>, { payload }: FSA) => ({
    ...state,
    loading: false,
    error: payload.toString(),
  }),
  [TOKEN_APPROVE_RESET]: (state: StateItem<Token>) => ({
    ...state,
    data: {
      ...state.data,
      approvals: initialState.data.approvals,
    },
  }),

  // Transfer
  [TOKEN_TRANSFER_REQUEST]: (state: StateItem<Token>, { payload }: FSA) => ({
    ...state,
    loading: true,
    request: payload,
  }),
  [TOKEN_TRANSFER_OK]: (state: StateItem<Token>, { payload }: FSA) => ({
    ...state,
    loading: false,
    data: {
      ...state.data,
      transfers: [
        ...state.data.transfers || [],
        payload,
      ],
    },
  }),
  [TOKEN_TRANSFER_ERROR]: (state: StateItem<Token>, { payload }: FSA) => ({
    ...state,
    loading: false,
    error: payload.toString(),
  }),
  [TOKEN_TRANSFER_RESET]: (state: StateItem<Token>) => ({
    ...state,
    data: {
      ...state.data,
      transfers: initialState.data.transfers,
    },
  }),
}

export default createReducer(handlers, initialState)

