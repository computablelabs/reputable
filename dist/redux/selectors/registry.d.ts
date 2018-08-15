import { State, Registry } from '../../interfaces';
declare const getRegistry: (state?: State) => Registry | undefined;
declare const getRegistryAddress: (state?: State) => string;
export { getRegistry, getRegistryAddress };
