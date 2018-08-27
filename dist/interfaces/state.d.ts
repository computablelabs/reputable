import { Parameterizer, Participant, Registry, StateItem, Token, Voting, Deployed } from '.';
interface State {
    readonly attributeStore?: StateItem<Deployed>;
    readonly dll?: StateItem<Deployed>;
    readonly parameterizer?: StateItem<Parameterizer>;
    readonly participants?: StateItem<Participant[]>;
    readonly registry?: StateItem<Registry>;
    readonly token?: StateItem<Token>;
    readonly voting?: StateItem<Voting>;
    readonly web3?: StateItem<Deployed>;
}
export default State;
