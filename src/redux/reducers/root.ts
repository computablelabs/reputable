// Local Dependencies
import { combineReducers } from 'redux'
import attributeStore from './attribute-store'
import dll from './dll'
import parameterizer from './parameterizer'
import participants from './participant'
import registry from './registry'
import token from './token'
import voting from './voting'
import web3 from './web3'

// TODO it appears that upcoming versions of redux typings will make the cast to 'any' not needed...
export default combineReducers({
  attributeStore,
  dll,
  parameterizer,
  participants,
  registry,
  token,
  voting,
  web3,
} as any)
