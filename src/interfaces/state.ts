import {
  Approval,
  GenericMap,
  Map,
  Parameterizer,
  Participant,
  Registry,
  StateItem,
  Token,
  Voting,
} from '.'

interface State {
  readonly attributeStoreAddress?: StateItem<Map>
  readonly dllAddress?: StateItem<Map>
  readonly parameterizer?: Parameterizer
  readonly participants?: StateItem<GenericMap<Participant>>
  readonly registry?: Registry
  readonly registryApplications?: StateItem<any>
  readonly token?: Token
  readonly tokenApprovals?: StateItem<GenericMap<Approval>>
  readonly voting?: Voting
  readonly web3?: StateItem<GenericMap<string>>
}

export default State

