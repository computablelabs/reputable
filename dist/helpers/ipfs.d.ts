import { Map } from '../interfaces';
declare const IPFSWrite: (data: string | Map) => Promise<string>;
declare const IPFSRead: (cid: string) => Promise<string | Map>;
export { IPFSWrite, IPFSRead };
