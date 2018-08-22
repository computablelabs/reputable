import {
  FSA,
  StateItem,
  GenericMap,
  Participant,
} from '../../interfaces'
import {
  PARTICIPANTS_OK,
  PARTICIPANTS_RESET,
} from '../action-creators/participant'
import createReducer from './createReducer'

const initialState: StateItem<GenericMap<Participant>> = {
  loading: false,
  request: {},
  data: {},
  error: undefined,
}

const handlers = {
  [PARTICIPANTS_OK]: (state: StateItem<GenericMap<Participant>>, { payload }: FSA) => {
    payload.owner = !Object.keys(state.data).length

    return {
      ...state,
      loading: false,
      data: {
        ...state.data,
        [payload.address]: payload,
      },
    }
  },
  [PARTICIPANTS_RESET]: () => ({
    ...initialState,
  }),
}

export default createReducer(handlers, initialState)

