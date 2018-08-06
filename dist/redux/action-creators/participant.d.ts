import { FSA } from '../../interfaces';
export declare const PARTICIPANTS_OK = "PARTICIPANTS_OK";
export declare const PARTICIPANTS_RESET = "PARTICIPANTS_RESET";
declare const participate: (name: string, address: string) => FSA;
declare const resetParticipants: () => FSA;
export { participate, resetParticipants };
