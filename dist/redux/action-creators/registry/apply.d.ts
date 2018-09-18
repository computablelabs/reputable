import { ApplicantData } from '../../../interfaces';
interface RegistryApplyParams {
    listing: string;
    userAddress: string;
    deposit: number;
    data?: ApplicantData;
}
declare const applyListing: ({ listing, userAddress, deposit, data, }: RegistryApplyParams) => any;
export { applyListing };
