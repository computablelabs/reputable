import {
  StateItem,
  Participant,
  Token,
  Parameterizer,
  Voting,
  Registry,
} from '.'

interface State {
  readonly websocketAddress?: string
  readonly participants?: StateItem<Participant>
  readonly token?: Token
  readonly parameterizer?: Parameterizer
  readonly voting?: Voting
  readonly registry?: Registry
  readonly dllAddress?: string
  readonly attributeStoreAddress?: string
}

export default State

