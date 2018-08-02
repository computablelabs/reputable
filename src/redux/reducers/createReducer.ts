import { Action, State, StateItem } from '../../interfaces'

interface Handlers {
  [PARTICIPATE: string]: Function,
}

const createReducer = (handlers: Handlers, initialState: StateItem = {}) =>
  (state: StateItem = initialState, action: Action) => {
    const handler: Function = handlers[action.type]

    return handler ? handler(state, action) : state
  };

export default createReducer

