import { ApplicantData } from '../../../interfaces';
export declare const REGISTRY_APPLY_REQUEST = "REGISTRY_APPLY_REQUEST";
export declare const REGISTRY_APPLY_OK = "REGISTRY_APPLY_OK";
export declare const REGISTRY_APPLY_ERROR = "REGISTRY_APPLY_ERROR";
export declare const REGISTRY_APPLY_RESET = "REGISTRY_APPLY_RESET";
interface RegistryApplyParams {
    listing: string;
    userAddress: string;
    deposit: number;
    data?: ApplicantData;
}
declare const apply: ({ listing, userAddress, deposit, data, }: RegistryApplyParams) => any;
declare const resetRegistryApply: () => any;
export { apply, resetRegistryApply };
