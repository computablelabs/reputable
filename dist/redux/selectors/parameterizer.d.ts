import { State, Parameterizer } from '../../interfaces';
declare const parameterizer: (state: State) => Parameterizer | undefined;
declare const address: (state: State) => string | undefined;
export { parameterizer, address, };
