import { combineReducers } from 'redux'
import { DEPLOY_PARAMETERIZER, DEPLOYED_PARAMETERIZER } from '../../constants'
import { FSA, Reducer } from '../../interfaces'

const address:Reducer<string|undefined, FSA> = (address = '', action) => {
  if (action.type === DEPLOYED_PARAMETERIZER) return action.payload.address
  return address
}

export default combineReducers({
  address,
})
