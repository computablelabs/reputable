import { State, Participant } from '../../interfaces';
declare const getParticipants: (state?: State) => Participant[];
declare const getOwner: (state?: State) => Participant | undefined;
export { getParticipants, getOwner };
