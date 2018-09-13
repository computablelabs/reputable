import { ApplicantData } from '../interfaces';
declare const encodeData: (applicantData: ApplicantData) => Promise<string>;
declare const decodeData: (data: string) => Promise<ApplicantData>;
export { encodeData, decodeData };
