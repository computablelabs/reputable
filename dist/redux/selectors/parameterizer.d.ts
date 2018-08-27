import { State, Parameterizer } from '../../interfaces';
declare const getParameterizer: (state?: State) => Parameterizer | undefined;
declare const getParameterizerAddress: (state?: State) => string;
export { getParameterizer, getParameterizerAddress };
