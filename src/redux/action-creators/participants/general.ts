// Local Dependencies
import {
  participantsOk,
  participantsReset,
} from './actions'

/* Action Creators */
const addParticipant = (name:string, address:string): any => (
  async (dispatch: Function): Promise<void> => (
    dispatch(participantsOk({ name, address }))
  )
)

const resetParticipants = (): any => (
  async (dispatch: Function): Promise<void> => (
    dispatch(participantsReset())
  )
)

export { addParticipant, resetParticipants }

