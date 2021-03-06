// Local Dependencies
import {
  FSA,
  StateItem,
  Participant,
} from '../../interfaces'
import {
  PARTICIPANTS_OK,
  PARTICIPANTS_RESET,
} from '../action-creators/participants'
import createReducer from './create-reducer'

const initialState: StateItem<Participant[]> = {
  loading: false,
  request: {},
  data: [],
  error: undefined,
}

const handlers = {
  // General
  [PARTICIPANTS_OK]: (state: StateItem<Participant[]>, { payload }: FSA) => {
    payload.owner = !state.data.length

    return {
      ...state,
      loading: false,
      data: [
        ...state.data || [],
        payload,
      ],
    }
  },
  [PARTICIPANTS_RESET]: () => ({
    ...initialState,
  }),
}

export default createReducer(handlers, initialState)

