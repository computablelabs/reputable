import { Deployed } from './general'
// Our representation of an addressable entity that has authorized at least one of the contracts
// to spend on their behalf. A party that has some tokens at stake somewhere in the system

export default interface Participant extends Deployed {
  name:string; // any sort of friendly name for the participant
  owner?:boolean; // our 'admin'. in this demo, it's the first participant...
}
