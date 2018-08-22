export interface Action {
  readonly type: string
}

// our actions will conform to this shape. NOTE: our version of the Flux Standard Action
// will not include an `error:...` key as we will use seperate types for `FOO` and `FOO_ERROR`.
export interface FSA extends Action {
  readonly payload: any
  readonly meta?: any
}

