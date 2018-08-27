/**
 * Bound action creators for participant state
 */

import store from '../store'
import {
  participate as add,
  resetParticipants as reset,
} from '../action-creators/participants'

const participate = async (name:string, address:string): Promise<void> => (
  await store.dispatch(add(name, address))
)

const resetParticipants = async (): Promise<void> => (
  await store.dispatch(reset())
)

export { participate, resetParticipants }

