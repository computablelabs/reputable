import { RegistryListing } from 'computable/dist/interfaces';
import { Nos } from 'computable/dist/types';
import { Map } from '../interfaces';
interface Registry {
    address?: string;
    applicants?: Applicant[];
    challenges?: Challenge[];
    listings?: Listing[];
}
interface Applicant {
    name: string;
    deposit?: Nos;
    data?: string;
}
interface ApplicantData {
    source?: string;
    value: Map | string;
}
interface Challenge {
}
interface Listing extends RegistryListing {
    hash: string;
}
export { Registry, Applicant, ApplicantData, Challenge, Listing, };
