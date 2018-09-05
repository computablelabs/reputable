import {
  FSA,
  StateItem,
  Registry,
  // Challenge,
} from '../../interfaces'
import {
  REGISTRY_DEPLOY_REQUEST,
  REGISTRY_DEPLOY_OK,
  REGISTRY_DEPLOY_ERROR,

  REGISTRY_ADDRESS_OK,
  REGISTRY_ADDRESS_RESET,

  REGISTRY_LISTING_REQUEST,
  REGISTRY_LISTING_OK,
  REGISTRY_LISTING_REMOVE,
  REGISTRY_LISTING_ERROR,
  REGISTRY_LISTING_RESET,

  REGISTRY_APPLY_REQUEST,
  REGISTRY_APPLY_OK,
  REGISTRY_APPLY_ERROR,

} from '../action-creators/registry'
import createReducer from './createReducer'

const initialState: StateItem<Registry> = {
  loading: false,
  request: {},
  data: {
    address: undefined,
    challenges: {},
    listings: {},
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

  // Listing Reducers
  [REGISTRY_LISTING_REQUEST]: (state: StateItem<Registry>, { payload }: FSA) => ({
    ...state,
    loading: true,
    request: payload,
  }),
  [REGISTRY_LISTING_OK]: (state: StateItem<Registry>, { payload }: FSA) => ({
    ...state,
    loading: false,
    data: {
      ...state.data,
      listings: {
        ...state.data.listings || {},
        [payload.listingHash]: payload,
      },
    },
  }),
  [REGISTRY_LISTING_REMOVE]: (state: StateItem<Registry>, { payload }: FSA) => {
    const listings = state.data.listings || {}
    delete listings[payload.listingHash]

    return {
      ...state,
      loading: false,
      data: {
        ...state.data,
        listings,
      }
    }
  },
  [REGISTRY_LISTING_ERROR]: (state: StateItem<Registry>, { payload }: FSA) => ({
    ...state,
    loading: false,
    error: payload.toString(),
  }),
  [REGISTRY_LISTING_RESET]: (state: StateItem<Registry>) => ({
    ...state,
    data: {
      ...state.data,
      listings: initialState.data.listings,
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
      listings: {
        ...state.data.listings || {},
        [payload.listingHash]: payload,
      },
    },
  }),
  [REGISTRY_APPLY_ERROR]: (state: StateItem<Registry>, { payload }: FSA) => ({
    ...state,
    loading: false,
    error: payload.toString(),
  }),

  // Challenge Reducers
  // TODO implement everything associated with this action type
}

export default createReducer(handlers, initialState)

