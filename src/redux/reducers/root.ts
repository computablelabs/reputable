import { combineReducers } from 'redux'
import websocketAddress from './web3'
import participants from './participant'
import token from './token'
import dllAddress from './dll'
import attributeStoreAddress from './attribute-store'
import voting from './voting'
import parameterizer from './parameterizer'
import registry from './registry'

// TODO it appears that upcoming versions of redux typings will make the cast to 'any' not needed...
export default combineReducers({
  websocketAddress,
  participants,
  token,
  dllAddress,
  attributeStoreAddress,
  voting,
  parameterizer,
  registry,
} as any)
