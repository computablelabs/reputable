import { combineReducers } from 'redux'
import websocketAddress from './web3'
import participants from './participant'
import token from './token'
import tokenApprovals from './token-approve'
import tokenTransfers from './token-transfer'
import dllAddress from './dll'
import attributeStoreAddress from './attribute-store'
import voting from './voting'
import parameterizer from './parameterizer'
import registry from './registry'
import registryApply from './registry-apply'

// TODO it appears that upcoming versions of redux typings will make the cast to 'any' not needed...
export default combineReducers({
  websocketAddress,
  participants,
  token,
  tokenApprovals,
  tokenTransfers,
  dllAddress,
  attributeStoreAddress,
  voting,
  parameterizer,
  registry,
  registryApply,
} as any)
