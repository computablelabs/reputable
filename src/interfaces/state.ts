import {
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
  readonly parameterizer?: StateItem<Parameterizer>
  readonly participants?: StateItem<GenericMap<Participant>>
  readonly registry?: StateItem<Registry>
  readonly token?: StateItem<Token>
  readonly voting?: Voting
  readonly web3?: StateItem<GenericMap<string>>
}

export default State

