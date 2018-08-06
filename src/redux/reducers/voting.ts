import { combineReducers } from 'redux'
import { DEPLOYED_VOTING, RESET_VOTING } from '../../constants'
import { FSA, Reducer } from '../../interfaces'

const address:Reducer<string|undefined, FSA> = (address = '', action) => {
  if (action.type === DEPLOYED_VOTING) return action.payload.address
  if (action.type === RESET_VOTING) return ''
  return address
}

export default combineReducers({
  address,
})
