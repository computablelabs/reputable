import { Action } from '../../../interfaces';
/**
 * For applications which have not yet deployed a token, you can do it from here.
 * Used in Specs and tutorial apps as well...
 */
declare const deployToken: (address?: string | undefined, supply?: string | number | undefined) => any;
declare const resetToken: () => Action;
export { deployToken, resetToken, };
