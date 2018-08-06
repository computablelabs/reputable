import { Action, StateItem } from '../../interfaces'

interface Handlers {
  [PARTICIPATE: string]: Function,
}

const defaultState = {
  loading: false,
  request: {},
  data: {},
}

const createReducer = (handlers: Handlers, initialState: StateItem<any> = defaultState) =>
  (state: StateItem<any> = initialState, action: Action) => {
    const handler: Function = handlers[action.type]

    return handler ? handler(state, action) : state
  };

export default createReducer

