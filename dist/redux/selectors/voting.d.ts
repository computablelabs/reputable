import { State, Voting } from '../../interfaces';
declare const voting: (state: State) => Voting | undefined;
declare const address: (state: State) => string | undefined;
export { voting, address, };
