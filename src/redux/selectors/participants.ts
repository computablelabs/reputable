import { State } from '../../interfaces'
import utils from './helpers'

const model = 'participants'

const getParticipants = (state: State, { ids }: any = {}) =>
  utils.getList({ state, model, ids })

const getParticipant = (state: State, key: string) =>
  utils.getItem({ state, model, key })

export {
  getParticipants,
  getParticipant,
}

