import { ApplicantData } from '../../../interfaces';
declare const fetchListing: (listingHash: string) => any;
interface RegistryApplyParams {
    listing: string;
    userAddress: string;
    deposit: number;
    data?: ApplicantData;
}
declare const applyListing: ({ listing, userAddress, deposit, data, }: RegistryApplyParams) => any;
declare const updateListingStatus: (listingHash: string) => any;
declare const resetRegistryListings: () => any;
export { fetchListing, applyListing, updateListingStatus, resetRegistryListings, };
