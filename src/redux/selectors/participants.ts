import { State, Participant } from '../../interfaces'
import utils from './helpers'

const model = 'participants'

const getParticipants = (state: State, { ids }: any = {}): Participant[] =>
  utils.getList({ state, model, ids })

const getParticipant = (state: State, key: string): Participant =>
  utils.getItem({ state, model, key })

const getOwner = (state: State): Participant => {
  const predicate = (item: Participant) => item.owner
  return utils.getList({ state, model, predicate })[0]
}

export {
  getParticipants,
  getParticipant,
  getOwner,
}

