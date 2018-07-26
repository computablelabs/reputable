import { ParameterizerDeployParams } from 'computable/dist/interfaces'
import store from '../store'
import { deployParameterizer as deploy, resetParameterizer as reset } from '../action-creators/parameterizer'

const deployParameterizer = async (address?:string, opts?:Partial<ParameterizerDeployParams>): Promise<string> =>
  store.dispatch(deploy(address, opts))

const resetParameterizer = (): void => {
  store.dispatch(reset())
}

export { deployParameterizer, resetParameterizer }
