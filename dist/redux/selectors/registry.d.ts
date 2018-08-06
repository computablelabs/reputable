import { State, Registry } from '../../interfaces';
declare const registry: (state: State) => Registry | undefined;
declare const address: (state: State) => string | undefined;
export { registry, address };
