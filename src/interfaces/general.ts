import State from './state'

export interface Void {
  (...args:any[]): void;
}

export interface Selector {
  (state:State): any;
}
