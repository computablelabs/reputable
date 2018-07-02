/**
 * Bound action creators for participant state
 */

import store from '../store'
import { participate as add, resetParticipants as reset } from '../action-creators/participant'

const participate = (name:string, address:string): void => {
  store.dispatch(add(name, address))
}

const resetParticipants = (): void => {
  store.dispatch(reset())
}

export { participate, resetParticipants }
