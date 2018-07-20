import { DEPLOY_DLL, DEPLOYED_DLL } from '../../constants'
import { FSA, Reducer } from '../../interfaces'

const dllAddress:Reducer<string|undefined, FSA> = (address = '', action) => {
  if (action.type === DEPLOYED_DLL) return action.payload.address
  return address
}

export default dllAddress
