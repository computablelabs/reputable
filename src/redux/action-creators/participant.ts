import { FSA, Participant } from '../../interfaces'

// Action Types
export const PARTICIPANTS_OK = 'PARTICIPANTS_OK'
export const PARTICIPANTS_RESET = 'PARTICIPANTS_RESET'

// Actions
const participantsOk = (value: Participant): FSA => ({
  type: PARTICIPANTS_OK,
  payload: value,
})

const participantsReset = (): FSA => ({
  type: PARTICIPANTS_RESET,
  payload: {},
})

// Action Creators
const participate = (name:string, address:string): FSA =>
  participantsOk({ name, address })

const resetParticipants = (): FSA =>
  participantsReset()

export { participate, resetParticipants }

