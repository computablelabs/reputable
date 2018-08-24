import { State, Voting } from '../../interfaces'

const voting = (state:State): Voting|undefined => state.voting

const address = (state:State): string => state.voting && state.voting.address || ''

export { voting, address }

