import {
  StateItem,
  Participant,
  Approval,
  Token,
  Parameterizer,
  Voting,
  Registry,
} from '.'

interface State {
  readonly attributeStoreAddress?: StateItem<string>
  readonly dllAddress?: StateItem<string>
  readonly parameterizer?: Parameterizer
  readonly participants?: StateItem<Participant>
  readonly registry?: Registry
  readonly registryApplications?: StateItem<any>
  readonly token?: Token
  readonly tokenApprovals?: StateItem<Approval>
  readonly voting?: Voting
  readonly websocketAddress?: StateItem<string>
}

export default State

