// Local Dependencies
import { FSA, StateItem } from '../../interfaces'
import { OBSERVER_ERROR } from '../action-creators/observer'
import createReducer from './createReducer'

const initialState: StateItem<undefined> = {
  loading: false,
  request: {},
  data: undefined,
  error: undefined,
}

const handlers = {
  // General
  [OBSERVER_ERROR]: (state: StateItem<undefined>, { payload }: FSA) => ({
    ...state,
    error: payload.toString(),
  }),
}

export default createReducer(handlers, initialState)

