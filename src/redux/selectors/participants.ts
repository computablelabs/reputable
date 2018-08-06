import { State } from '../../interfaces'
import utils from './helpers'

const model = 'participants'

const getParticipants = (state: State, { ids }: any = {}): any[] =>
  utils.getList({ state, model, ids })

const getParticipant = (state: State, key: string): any =>
  utils.getItem({ state, model, key })

export {
  getParticipants,
  getParticipant,
}

