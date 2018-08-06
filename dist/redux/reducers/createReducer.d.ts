import { Action, StateItem } from '../../interfaces';
interface Handlers {
    [PARTICIPATE: string]: Function;
}
declare const createReducer: (handlers: Handlers, initialState?: StateItem<any>) => (state: StateItem<any> | undefined, action: Action) => any;
export default createReducer;
