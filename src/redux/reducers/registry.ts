// Local Dependencies
import { FSA, StateItem, Registry } from '../../interfaces'
import {
  REGISTRY_RESET,

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

  REGISTRY_CHALLENGE_REQUEST,
  REGISTRY_CHALLENGE_OK,
  REGISTRY_CHALLENGE_ERROR,
  REGISTRY_CHALLENGE_RESET,
} from '../action-creators/registry'
import createReducer from './create-reducer'

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
  // General
  [REGISTRY_RESET]: () => ({
    ...initialState,
  }),

  // Deploy
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

  // Address
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

  // Listing
  [REGISTRY_LISTING_REQUEST]: (state: StateItem<Registry>, { payload }: FSA) => ({
    ...state,
    loading: true,
    request: payload,
  }),
  [REGISTRY_LISTING_OK]: (state: StateItem<Registry>, { payload }: FSA) => {
    const listings = state.data.listings || {};
    const listing = {
      ...listings[payload.listingHash],
      ...payload,
    };

    return {
      ...state,
      loading: false,
      data: {
        ...state.data,
        listings: {
          ...listings,
          [payload.listingHash]: listing,
        },
      },
    };
  },
  [REGISTRY_LISTING_REMOVE]: (state: StateItem<Registry>, { payload }: FSA) => {
    const listings = state.data.listings || {}
    delete listings[payload]

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

  // Applicant
  [REGISTRY_APPLY_REQUEST]: (state: StateItem<Registry>, { payload }: FSA) => ({
    ...state,
    loading: true,
    request: payload,
  }),
  [REGISTRY_APPLY_OK]: (state: StateItem<Registry>, { payload }: FSA) => {
    const listings = state.data.listings || {};
    const listing = {
      ...listings[payload.listingHash],
      ...payload,
    };

    return {
      ...state,
      loading: false,
      data: {
        ...state.data,
        listings: {
          ...listings,
          [payload.listingHash]: listing,
        },
      },
    }
  },
  [REGISTRY_APPLY_ERROR]: (state: StateItem<Registry>, { payload }: FSA) => ({
    ...state,
    loading: false,
    error: payload.toString(),
  }),

  // Challenge
  [REGISTRY_CHALLENGE_REQUEST]: (state: StateItem<Registry>, { payload }: FSA) => ({
    ...state,
    loading: true,
    request: payload,
  }),
  [REGISTRY_CHALLENGE_OK]: (state: StateItem<Registry>, { payload }: FSA) => {
    const challenges = state.data.challenges || {}
    const challenge = {
      ...challenges[payload.id],
      ...payload,
    }

    return {
      ...state,
      loading: false,
      data: {
        ...state.data,
        challenges: {
          ...challenges,
          [payload.id]: challenge,
        },
      },
    }
  },
  [REGISTRY_CHALLENGE_ERROR]: (state: StateItem<Registry>, { payload }: FSA) => ({
    ...state,
    loading: false,
    error: payload.toString(),
  }),
  [REGISTRY_CHALLENGE_RESET]: (state: StateItem<Registry>, { payload }: FSA) => ({
    ...state,
    data: {
      ...state.data,
      challenges: initialState.data.challenges,
    }
  })
}

export default createReducer(handlers, initialState)

