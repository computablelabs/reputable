/**
 * Top level reducer for the registry state pieces.
 * Subdivides the responsibility of managing:
 * * applicants
 * * challenges
 * * listings
 */
import { Applicant, Challenge, Listing } from '../../interfaces';
declare const _default: import("redux").Reducer<{
    applicants: Applicant[] | undefined;
    challenges: Challenge[] | undefined;
    listings: Listing[] | undefined;
}, import("redux").AnyAction>;
export default _default;
