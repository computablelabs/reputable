import State from './state';
export interface Void {
    (...args: any[]): void;
}
export interface Selector {
    (state: State): any;
}
export interface Deployed {
    address: string;
}
interface mapFn {
    (): any;
}
export interface ReductionMap {
    [key: string]: mapFn;
}
export {};
