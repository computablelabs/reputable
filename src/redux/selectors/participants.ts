import { State, StateItem, Participant } from '../../interfaces'

const model = 'participants'

const getParticipants = (state: State = {}): Participant[] => {
  const stateItem: StateItem<Participant[]>|undefined = state[model]
  if (!stateItem) {
    return []
  }

  return stateItem.data || []
}

const getOwner = (state: State = {}): Participant|undefined => {
  const participants: Participant[] = getParticipants(state)
  const owner: Participant|undefined = participants.find(
    (participant: Participant) => !!participant.owner
  )

  return owner
}

export { getParticipants, getOwner }

