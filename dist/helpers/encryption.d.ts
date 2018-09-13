import { Map } from '../interfaces';
declare const encrypt: (value: string | Map) => Promise<string>;
declare const decrypt: (value: string) => Promise<string | Map>;
export { encrypt, decrypt };
