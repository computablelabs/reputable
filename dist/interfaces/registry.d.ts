import { RegistryListing, Challenge as RegistryChallenge } from 'computable/dist/interfaces';
import { GenericMap, Map } from '../interfaces';
interface Registry {
    address?: string;
    challenges?: GenericMap<Challenge>;
    listings?: GenericMap<Listing>;
}
interface ApplicantData {
    source?: string;
    value: Map | string;
}
interface Challenge extends RegistryChallenge {
    id: string;
    listingHash: string;
}
interface Listing extends RegistryListing {
    listingHash: string;
    data?: ApplicantData | string;
}
export { Registry, ApplicantData, Challenge, Listing, };
