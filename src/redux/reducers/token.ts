/**
 * Top level reducer for the token state pieces.
 * Subdivides the responsibility of managing:
 * * token
 * * approvals
 * * transfers
 */

import { combineReducers } from 'redux'
import { Nos } from 'computable/dist/types'
import {
  DEPLOY_TOKEN,
  DEPLOYED_TOKEN,
  RESET_TOKEN,
} from '../../constants'
import {
  FSA,
  Reducer,
  ReductionMap,
} from '../../interfaces'

const address:Reducer<string|undefined, FSA> = (address = '', action) => {
  const map:ReductionMap = {
    [DEPLOYED_TOKEN]: () => action.payload.address,

    [RESET_TOKEN]: () => '',
  }

  return map[action.type] ? map[action.type]() : address
}

const supply:Reducer<Nos|undefined, FSA> = (supply = 0, action) => {
  const map:ReductionMap = {
    [DEPLOY_TOKEN]: () => action.payload.supply,

    [RESET_TOKEN]: () => 0,
  }

  return map[action.type] ? map[action.type]() : supply
}

export default combineReducers({
  address,
  supply,
})
