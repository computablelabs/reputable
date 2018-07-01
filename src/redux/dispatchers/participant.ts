/**
 * Bound action creators for participant state
 */

import store from '../store'
import { addParticipant, clearParticipants } from '../action-creators/participant'

const participate = (name:string, address:string): void => {
  store.dispatch(addParticipant(name, address))
}

const resetParticipants = (): void => {
  store.dispatch(clearParticipants())
}

export { participate, resetParticipants }
