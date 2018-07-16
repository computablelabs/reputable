import { Participant, Token, Parameterizer, Voting, Registry } from '.';
export default interface State {
    readonly websocketAddress?: string;
    readonly participants?: Participant[];
    readonly token?: Token;
    readonly parameterizer?: Parameterizer;
    readonly voting?: Voting;
    readonly registry?: Registry;
    readonly dllAddress?: string;
    readonly attributeStoreAddress?: string;
}
