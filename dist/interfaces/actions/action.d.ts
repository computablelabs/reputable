export interface Action {
    readonly type: string;
}
export interface FSA extends Action {
    readonly payload: {
        [key: string]: any;
    };
    readonly meta?: any;
}
