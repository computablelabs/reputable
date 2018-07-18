import { combineReducers } from 'redux'
import { DEPLOY_VOTING, DEPLOYED_VOTING } from '../../constants'
import { FSA, Reducer } from '../../interfaces'

const address:Reducer<string|undefined, FSA> = (address = '', action) => {
  if (action.type === DEPLOYED_VOTING) return action.payload.address
  return address
}

export default combineReducers({
  address,
})
