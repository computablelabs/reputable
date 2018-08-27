import { State, Registry, Applicant } from '../../interfaces';
declare const getRegistry: (state?: State) => Registry | undefined;
declare const getRegistryAddress: (state?: State) => string;
declare const getApplicants: (state?: State) => Applicant[];
export { getRegistry, getRegistryAddress, getApplicants };
