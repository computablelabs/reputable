import { ParameterizerDeployParams } from 'computable/dist/interfaces';
declare const deployParameterizer: (address?: string | undefined, opts?: Partial<ParameterizerDeployParams> | undefined) => Promise<string>;
declare const resetParameterizer: () => void;
export { deployParameterizer, resetParameterizer };
