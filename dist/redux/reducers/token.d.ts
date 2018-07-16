/**
 * Top level reducer for the token state pieces.
 * Subdivides the responsibility of managing:
 * * token
 * * approvals
 * * transfers
 */
import { Approval, Transfer } from '../../interfaces';
declare const _default: import("redux").Reducer<{
    address: string | undefined;
    supply: string | number | undefined;
    approvals: Approval[] | undefined;
    transfers: Transfer[] | undefined;
}, import("redux").AnyAction>;
export default _default;
