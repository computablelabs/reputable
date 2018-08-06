import { State } from '../../interfaces';
declare const getParticipants: (state: State, { ids }?: any) => any[];
declare const getParticipant: (state: State, key: string) => any;
export { getParticipants, getParticipant, };
