// Local Dependencies
import { FSA, StateItem, Deployed, Map } from '../../interfaces'
import {
  VOTING_RESET,

  VOTING_DEPLOY_REQUEST,
  VOTING_DEPLOY_OK,
  VOTING_DEPLOY_ERROR,

  VOTING_ADDRESS_OK,
  VOTING_ADDRESS_RESET,

  VOTING_VOTE_REQUEST,
  VOTING_VOTE_OK,
  VOTING_VOTE_ERROR,
} from '../action-creators/voting'
import createReducer from './create-reducer'

const initialState: StateItem<Deployed> = {
  loading: false,
  request: {},
  data: { address: '' },
  error: undefined,
}

const handlers = {
  // General
  [VOTING_RESET]: () => ({
    ...initialState,
  }),

  // Deploy
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

  // Address
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
  }),

  // Vote
  [VOTING_VOTE_REQUEST]: (state: StateItem<Map>, { payload }: FSA) => ({
    // TODO implement
  }),
  [VOTING_VOTE_OK]: (state: StateItem<Map>, { payload }: FSA) => ({
    // TODO implement
  }),
  [VOTING_VOTE_ERROR]: (state: StateItem<Map>, { payload }: FSA) => ({
    ...state,
    loading: false,
    error: payload.toString(),
  }),
}

export default createReducer(handlers, initialState)

