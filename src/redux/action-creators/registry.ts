import { Nos } from 'computable/dist/types'
import { APPLY } from '../../constants'
import {
  FSA,
  Applicant,
} from '../../interfaces'

const apply = (name:string, deposit:Nos, data?:string): FSA => {
  const payload:Applicant = { name, deposit, data }
  return { type: APPLY, payload }
}

export { apply }
