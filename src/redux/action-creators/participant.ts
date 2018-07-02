import { PARTICIPATE, RESET_PARTICIPANTS } from '../../constants'
import { Action, FSA, Participant } from '../../interfaces'

const participate = (name:string, address:string): FSA => {
  const payload:Participant = { name, address }
  return { type: PARTICIPATE, payload }
}

const resetParticipants = (): Action => ({ type: RESET_PARTICIPANTS })

export { participate, resetParticipants }
