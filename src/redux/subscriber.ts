/*
 * A Function taking an 'onChange' callback, and an optional selection Filter.
 * These are used to subscribe to the redux store's change call, and filter the call to
 * getState thru <select> if provided. Eventually the provided <onChange> is called (if
 * the current state is different from the last seen)
 */

import { Void, Selector } from '../interfaces'
import store from './store'

class BoundHandler {
  private currentState: any;

  constructor(private onChange:Void, private select?:Selector) {}

  handler = () => {
    const nextState: any = this.select? this.select(store.getState()) : store.getState()
    if (nextState !== this.currentState) {
      this.currentState = nextState
      this.onChange(this.currentState)
    }
  }
}

const subscriber:Void = (onChange:Void, select?:Selector) => {
  const bound = new BoundHandler(onChange, select)

  const unsubscribe = store.subscribe(bound.handler)
  // TODO make this initial call optional?
  bound.handler()
  return unsubscribe
}

export default subscriber
