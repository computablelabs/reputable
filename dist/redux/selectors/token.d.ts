import { State, Token, Approval, Transfer } from '../../interfaces';
declare const token: (state: State) => Token | undefined;
declare const address: (state: State) => string | undefined;
declare const approvals: (state: State) => Approval[] | undefined;
declare const transfers: (state: State) => Transfer[] | undefined;
export { token, address, approvals, transfers, };
