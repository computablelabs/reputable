import { PARTICIPATE, RESET_PARTICIPANTS } from '../../constants'
import { Action, FSA, Participant } from '../../interfaces'

const addParticipant = (name:string, address:string): FSA => {
  const payload:Participant = { name, address }
  return { type: PARTICIPATE, payload }
}

const clearParticipants = (): Action => ({ type: RESET_PARTICIPANTS })

export { addParticipant, clearParticipants }
