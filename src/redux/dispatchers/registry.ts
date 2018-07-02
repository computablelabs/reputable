import { Nos } from 'computable/dist/types'
import store from '../store'
import { apply as getApplicant } from '../action-creators/registry'
import { TokenDefaults } from '../../constants'

const apply = (name:string, deposit?:Nos, data?:string): void => {
  // TODO default for deposit? App needs/has parameterizer defaults?
  store.dispatch(getApplicant(name, deposit || 0, data)) // this should move an application into the applicants list
}

export { apply }
