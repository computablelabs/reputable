interface StateItem<T> {
  readonly loading: boolean
  readonly request: { [key: string]: any }
  readonly data: { [key: string]: T }
  readonly error?: Error | string
}

export default StateItem

