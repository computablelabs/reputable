import Web3 from 'web3'
import { Challenge } from 'computable/dist/interfaces'
import {
  ParsedUrl,
  Participant,
  Token,
  Parameterizer,
  Voting,
  Registry,
} from '.'

export default interface State {
  readonly web3?:Web3;
  readonly parsedUrl?:ParsedUrl;
  readonly participants?:Participant[];
  readonly token?:Token;
  readonly parameterizer?:Parameterizer;
  readonly voting?:Voting;
  readonly registry?:Registry;
  readonly dllAddress?:string;
  readonly attributeStoreAddress?:string;
}
