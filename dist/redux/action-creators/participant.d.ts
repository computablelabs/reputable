import { Action, FSA } from '../../interfaces';
declare const participate: (name: string, address: string) => FSA;
declare const resetParticipants: () => Action;
export { participate, resetParticipants };
