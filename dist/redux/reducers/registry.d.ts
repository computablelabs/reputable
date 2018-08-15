/**
 * Top level reducer for the registry state pieces.
 * Subdivides the responsibility of managing:
 * * applicants
 * * challenges
 * * listings
 */
import { Challenge, Listing } from '../../interfaces';
declare const _default: import("redux").Reducer<{
    address: string | undefined;
    challenges: Challenge[] | undefined;
    listings: Listing[] | undefined;
}, import("redux").AnyAction>;
export default _default;
