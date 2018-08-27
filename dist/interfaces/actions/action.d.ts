export interface Action {
    readonly type: string;
}
export interface FSA extends Action {
    readonly payload: any;
    readonly meta?: any;
}
