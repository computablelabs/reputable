import { FSA, StateItem, Deployed } from '../../interfaces'
import {
  ATTRIBUTE_STORE_REQUEST,
  ATTRIBUTE_STORE_OK,
  ATTRIBUTE_STORE_ERROR,
  ATTRIBUTE_STORE_RESET,
} from '../action-creators/attribute-store'
import createReducer from './createReducer'

const initialState: StateItem<Deployed> = {
  loading: false,
  request: {},
  data: { address: '' },
  error: undefined,
}

const handlers = {
  [ATTRIBUTE_STORE_REQUEST]: (state: StateItem<Deployed>, { payload }: FSA) => ({
    ...state,
    loading: true,
    request: payload,
  }),
  [ATTRIBUTE_STORE_OK]: (state: StateItem<Deployed>, { payload }: FSA) => ({
    ...state,
    loading: false,
    data: {
      address: payload.address,
    },
  }),
  [ATTRIBUTE_STORE_ERROR]: (state: StateItem<Deployed>, { payload }: FSA) => ({
    ...state,
    loading: false,
    error: payload.toString(),
  }),
  [ATTRIBUTE_STORE_RESET]: () => ({
    ...initialState,
  }),
}

export default createReducer(handlers, initialState)

