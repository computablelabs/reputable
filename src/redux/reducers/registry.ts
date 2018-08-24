import {
  FSA,
  StateItem,
  Registry,
  // Challenge,
  // Listing,
} from '../../interfaces'
import {
  REGISTRY_DEPLOY_REQUEST,
  REGISTRY_DEPLOY_OK,
  REGISTRY_DEPLOY_ERROR,

  REGISTRY_ADDRESS_OK,
  REGISTRY_ADDRESS_RESET,

  REGISTRY_APPLY_REQUEST,
  REGISTRY_APPLY_OK,
  REGISTRY_APPLY_ERROR,
  REGISTRY_APPLY_RESET,
} from '../action-creators/registry'
import {
  LIST,
  // CHALLENGE,
} from '../../constants'
import createReducer from './createReducer'

const initialState: StateItem<Registry> = {
  loading: false,
  request: {},
  data: {
    address: undefined,
    applicants: [],
    challenges: [],
    listings: [],
  },
  error: undefined,
}

const handlers = {
  // Deploy Reducers
  [REGISTRY_DEPLOY_REQUEST]: (state: StateItem<Registry>, { payload }: FSA) => ({
    ...state,
    loading: true,
    request: payload,
  }),
  [REGISTRY_DEPLOY_OK]: (state: StateItem<Registry>, { payload }: FSA) => ({
    ...state,
    loading: false,
    data: {
      ...state.data,
      address: payload.address,
    },
  }),
  [REGISTRY_DEPLOY_ERROR]: (state: StateItem<Registry>, { payload }: FSA) => ({
    ...state,
    loading: false,
    error: payload.toString(),
  }),

  // Address Reducers
  [REGISTRY_ADDRESS_OK]: (state: StateItem<Registry>, { payload }: FSA) => ({
    ...state,
    loading: false,
    data: {
      ...state.data,
      address: payload.address,
    },
  }),
  [REGISTRY_ADDRESS_RESET]: (state: StateItem<Registry>) => ({
    ...state,
    data: {
      ...state.data,
      address: initialState.data.address,
    },
  }),

  // Applicant Reducers
  [REGISTRY_APPLY_REQUEST]: (state: StateItem<Registry>, { payload }: FSA) => ({
    ...state,
    loading: true,
    request: payload,
  }),
  [REGISTRY_APPLY_OK]: (state: StateItem<Registry>, { payload }: FSA) => ({
    ...state,
    loading: false,
    data: {
      ...state.data,
      applicants: [
        ...state.data.applicants || [],
        payload,
      ],
    },
  }),
  [REGISTRY_APPLY_ERROR]: (state: StateItem<Registry>, { payload }: FSA) => ({
    ...state,
    loading: false,
    error: payload.toString(),
  }),
  [REGISTRY_APPLY_RESET]: (state: StateItem<Registry>) => ({
    ...state,
    data: {
      ...state.data,
      applicants: initialState.data.applicants,
    },
  }),

  // Challenge Reducers
  // Listing Reducers
  [LIST]: (state: StateItem<Registry>, { payload }: FSA) => ({
    ...state,
    data: {
      ...state.data,
      listings: [
        ...state.data.listings || [],
        payload,

        /*
        hash: action.payload.hash, // remember this does not come back from VM, we supply
        applicationExpiry: action.payload.applicationExpiry,
        whitelisted: action.payload.whitelisted,
        owner: action.payload.owner,
        unstakedDeposit: action.payload.unstakedDeposit,
        // NOTE: there won't be a challengeID on the initial LIST action
        */
      ],
    },
  }),
}

export default createReducer(handlers, initialState)

