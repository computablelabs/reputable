import { combineReducers } from 'redux'
import participants from './participant'
import registry from './registry'
import token from './token'
import web3 from './web3'

// TODO it appears that upcoming versions of redux typings will make the cast to 'any' not needed...
export default combineReducers({
  web3,
  participants,
  token,
  registry,
} as any)
