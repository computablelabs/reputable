import {
  FSA,
  StateItem,
} from '../../interfaces'
import {
  REGISTRY_APPLY_REQUEST,
  REGISTRY_APPLY_OK,
  REGISTRY_APPLY_ERROR,
  REGISTRY_APPLY_RESET,
} from '../action-creators/registry/apply'
import createReducer from './createReducer'

const initialState: StateItem<string> = {
  loading: false,
  request: {},
  data: {},
  error: undefined,
}

const handlers = {
  [REGISTRY_APPLY_REQUEST]: (state: StateItem<string>, { payload }: FSA) => ({
    ...state,
    loading: true,
    request: payload,
  }),
  // we will add an applicant to the state tree
  [REGISTRY_APPLY_OK]: (state: StateItem<string>, { payload }: FSA) => ({
    ...state,
    loading: false,
    data: {
      ...state.data,
      ...payload,
    },
  }),
  [REGISTRY_APPLY_ERROR]: (state: StateItem<string>, { payload }: FSA) => ({
    ...state,
    loading: false,
    error: payload.toString(),
  }),
  [REGISTRY_APPLY_RESET]: (state: StateItem<string>, { payload }: FSA) => ({
    ...initialState,
  }),
}

export default createReducer(handlers, initialState)

