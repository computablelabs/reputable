// Local Dependencies
import { FSA, Participant } from '../../../interfaces'

/* Action Types */
export const PARTICIPANTS_OK = 'PARTICIPANTS_OK'
export const PARTICIPANTS_RESET = 'PARTICIPANTS_RESET'

/* Actions */
// General
export const participantsOk = (value: Participant): FSA => ({
  type: PARTICIPANTS_OK,
  payload: value,
})

export const participantsReset = (): FSA => ({
  type: PARTICIPANTS_RESET,
  payload: {},
})

