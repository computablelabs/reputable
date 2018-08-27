import { RegistryListing } from 'computable/dist/interfaces';
import { Nos } from 'computable/dist/types';
export interface Applicant {
    name: string;
    deposit?: Nos;
    data?: string;
}
export interface Challenge {
}
export interface Listing extends RegistryListing {
    hash: string;
}
export interface Registry {
    address?: string;
    applicants?: Applicant[];
    challenges?: Challenge[];
    listings?: Listing[];
}
