import { combineReducers } from 'redux'
import { DEPLOYED_PARAMETERIZER, RESET_PARAMETERIZER } from '../../constants'
import { FSA, Reducer } from '../../interfaces'

const address:Reducer<string|undefined, FSA> = (address = '', action) => {
  if (action.type === DEPLOYED_PARAMETERIZER) return action.payload.address
  if (action.type === RESET_PARAMETERIZER) return ''
  return address
}

// TODO reducers for the locally retained p11r attributes (whatever they may be)

export default combineReducers({
  address,
})
