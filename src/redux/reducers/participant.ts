import { PARTICIPATE, RESET_PARTICIPANTS } from '../../constants'
import {
  FSA,
  State,
  StateItem,
  Reducer,
  Participant,
} from '../../interfaces'
import { getParticipants } from '../selectors'
import createReducer from './createReducer'

const initialState: StateItem = {
  loading: false,
  request: undefined,
  data: [],
  error: undefined,
}

const handlers = {
  [PARTICIPATE]: (state: StateItem, { payload }: FSA) => {
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
  [RESET_PARTICIPANTS]: (state: State, { payload }: FSA) => ({
    ...initialState,
  }),
}

export default createReducer(handlers, initialState)

