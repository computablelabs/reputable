import { State, GenericMap } from '../../interfaces'
import utils from './helpers'

const model = 'registryApplications'

const getApplications = (state: State = {}, { ids }: any = {}): GenericMap<string>[] =>
  utils.getList({ state, model, ids })

const getApplication = (state: State = {}, key: string): GenericMap<string> =>
  utils.getItem({ state, model, key })

export { getApplications, getApplication }

