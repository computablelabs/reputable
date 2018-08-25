import { State, StateItem, Voting } from '../../interfaces'

const model = 'voting'

const getVoting = (state: State = {}): Voting|undefined => {
  const stateItem: StateItem<Voting>|undefined = state[model]
  if (!stateItem) {
    return undefined
  }

  return stateItem.data
}

const getVotingAddress = (state: State = {}): string => {
  const voting: Voting|undefined = getVoting(state)
  if (!voting) {
    return ''
  }

  return voting.address
}

export { getVoting, getVotingAddress }

