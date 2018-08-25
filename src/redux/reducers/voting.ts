import { FSA, StateItem, Deployed } from '../../interfaces'
import {
  VOTING_DEPLOY_REQUEST,
  VOTING_DEPLOY_OK,
  VOTING_DEPLOY_ERROR,

  VOTING_ADDRESS_OK,
  VOTING_ADDRESS_RESET,
} from '../action-creators/voting'
import createReducer from './createReducer'

const initialState: StateItem<Deployed> = {
  loading: false,
  request: {},
  data: { address: '' },
  error: undefined,
}

const handlers = {
  [VOTING_DEPLOY_REQUEST]: (state: StateItem<Deployed>, { payload }: FSA) => ({
    ...state,
    loading: true,
    request: payload,
  }),
  [VOTING_DEPLOY_OK]: (state: StateItem<Deployed>, { payload }: FSA) => ({
    ...state,
    loading: false,
    data: {
      ...state.data,
      address: payload.address,
    },
  }),
  [VOTING_DEPLOY_ERROR]: (state: StateItem<Deployed>, { payload }: FSA) => ({
    ...state,
    loading: false,
    error: payload.toString(),
  }),

  [VOTING_ADDRESS_OK]: (state: StateItem<Deployed>, { payload }: FSA) => ({
    ...state,
    loading: false,
    data: {
      ...state.data,
      address: payload.address,
    },
  }),
  [VOTING_ADDRESS_RESET]: (state: StateItem<Deployed>, { payload }: FSA) => ({
    ...state,
    data: {
      ...state.data,
      address: initialState.data.address,
    },
  })
}

export default createReducer(handlers, initialState)

