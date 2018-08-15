import { State, Token } from '../../interfaces';
declare const token: (state: State) => Token | undefined;
declare const address: (state: State) => string | undefined;
export { token, address, };
