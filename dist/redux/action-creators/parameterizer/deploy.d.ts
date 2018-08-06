import { ParameterizerDeployParams } from 'computable/dist/interfaces';
import { Action } from '../../../interfaces';
/**
 * For applications which have not yet deployed a parameterizer, you can do it from here.
 * Used in Specs and tutorial apps as well...
 *
 * Note that we use the object `opts` here to house any number of the possible arguments, any
 * not specified should fall back to a set of defaults defined here in the app. Also, the
 * computable.js lib itself declares a set of defaults for the parameterizer - so any not specified
 * as defaults in this app will fall-back to those...
 *
 * Use of Partial on the deploy params as we do not expect you to pass the addresses of things already deployed
 */
declare const deployParameterizer: (address?: string | undefined, opts?: Partial<ParameterizerDeployParams> | undefined) => any;
declare const resetParameterizer: () => Action;
export { deployParameterizer, resetParameterizer, };
