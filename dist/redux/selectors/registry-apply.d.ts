import { State } from '../../interfaces';
declare const getApplications: (state?: State, { ids }?: any) => {
    [key: string]: string;
}[];
declare const getApplication: (state: State | undefined, key: string) => {
    [key: string]: string;
};
export { getApplications, getApplication };
