import { FSA, Participant } from '../../../interfaces';
export declare const PARTICIPANTS_OK = "PARTICIPANTS_OK";
export declare const PARTICIPANTS_RESET = "PARTICIPANTS_RESET";
export declare const participantsOk: (value: Participant) => FSA;
export declare const participantsReset: () => FSA;
