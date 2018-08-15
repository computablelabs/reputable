import { StateItem, Participant, Approval, Token, Parameterizer, Voting, Registry } from '.';
interface State {
    readonly websocketAddress?: string;
    readonly participants?: StateItem<Participant>;
    readonly token?: Token;
    readonly tokenApprovals?: StateItem<Approval>;
    readonly parameterizer?: Parameterizer;
    readonly voting?: Voting;
    readonly registry?: Registry;
    readonly registryApplications?: StateItem<any>;
    readonly dllAddress?: StateItem<string>;
    readonly attributeStoreAddress?: StateItem<string>;
}
export default State;
