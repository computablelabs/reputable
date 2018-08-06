import { Deployed } from './general';
export default interface Participant extends Deployed {
    name: string;
    owner?: boolean;
}
