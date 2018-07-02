import State from './state'

// a function that returns nothing
export interface Void {
  (...args:any[]): void;
}

// a function which takes our State as an arg, returning <any>
export interface Selector {
  (state:State): any;
}
