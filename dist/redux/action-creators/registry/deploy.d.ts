import { Action } from '../../../interfaces';
/**
 * Pass in a name for the registry and optionally a deploy-from address (will default to admin if falsy)
 */
declare const deployRegistry: (name: string, address?: string | undefined) => any;
declare const resetRegistry: () => Action;
export { deployRegistry, resetRegistry, };
