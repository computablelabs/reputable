import { Action } from '../../../interfaces';
declare const deployToken: (address?: string | undefined, supply?: string | number | undefined) => any;
declare const resetToken: () => Action;
export { deployToken, resetToken, };
