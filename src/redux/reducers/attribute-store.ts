import { FSA, StateItem } from '../../interfaces'
import {
  ATTRIBUTE_STORE_REQUEST,
  ATTRIBUTE_STORE_OK,
  ATTRIBUTE_STORE_ERROR,
  ATTRIBUTE_STORE_RESET,
} from '../action-creators/attribute-store'
import createReducer from './createReducer'

const initialState: StateItem<string> = {
  loading: false,
  request: {},
  data: {},
  error: undefined,
}

const handlers = {
  [ATTRIBUTE_STORE_REQUEST]: (state: StateItem<string>, { payload }: FSA) => ({
    ...state,
    loading: true,
    request: payload,
  }),
  [ATTRIBUTE_STORE_OK]: (state: StateItem<string>, { payload }: FSA) => ({
    ...state,
    loading: false,
    data: {
      [payload.address]: payload.address,
    },
  }),
  [ATTRIBUTE_STORE_ERROR]: (state: StateItem<string>, { payload }: FSA) => ({
    ...state,
    loading: false,
    error: payload.toString(),
  }),
  [ATTRIBUTE_STORE_RESET]: (state: StateItem<string>, { payload }: FSA) => ({
    ...initialState,
  }),
}

export default createReducer(handlers, initialState)


