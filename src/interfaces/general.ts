import State from './state'

// a function that returns nothing
export interface Void {
  (...args:any[]): void;
}

// a function which takes our State as an arg, returning <any>
export interface Selector {
  (state:State): any;
}

// an object which has an `address` attribute due to a deployment
export interface Deployed {
  address: string;
}

// the functions on ReductionMaps take no args and return something
interface mapFn {
  (): any;
}
// the map objects used in reducers need a call signature
export interface ReductionMap {
  [key:string]: mapFn;
}
