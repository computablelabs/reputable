import { ParameterizerDeployParams } from 'computable/dist/interfaces'
import store from '../store'
import { deployParameterizer as deploy } from '../action-creators/parameterizer'

const deployParameterizer = async (address?:string, opts?:Partial<ParameterizerDeployParams>): Promise<string> =>
  store.dispatch(deploy(address, opts))

export { deployParameterizer }
