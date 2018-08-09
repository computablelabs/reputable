import { State, Participant } from '../../interfaces';
declare const getParticipants: (state: State, { ids }?: any) => Participant[];
declare const getParticipant: (state: State, key: string) => Participant;
declare const getOwner: (state: State) => Participant;
export { getParticipants, getParticipant, getOwner, };
