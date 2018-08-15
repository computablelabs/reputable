import { State } from '../../interfaces'
import utils from './helpers'

const model = 'registryApplications'

const getApplications = (state: State = {}, { ids }: any = {}): { [key: string]: string }[] =>
  utils.getList({ state, model, ids })

const getApplication = (state: State = {}, key: string): { [key: string]: string } =>
  utils.getItem({ state, model, key })

export { getApplications, getApplication }

