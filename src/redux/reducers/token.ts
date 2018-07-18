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
  APPROVE,
  APPROVED,
  TRANSFER,
} from '../../constants'
import {
  FSA,
  Reducer,
  Approval,
  Transfer
} from '../../interfaces'

const address:Reducer<string|undefined, FSA> = (address = '', action) => {
  // we won't have an actual address until the VM sends back the TX from deploy
  if (action.type === DEPLOYED_TOKEN) return action.payload.address
  return address
}

// TODO create a state piece for an in-flight approval to handle APPROVE
const approvals:Reducer<Approval[]|undefined, FSA> = (state = [], action) => {
  const map = {
    // we will add an applicant to the state tree
    [APPROVED]: () => ([
      ...state,
      {
        address: action.payload.address,
        amount: action.payload.amount,
        from: action.payload.from,
      }
    ]),
  }

  // @ts-ignore:7017
  return map[action.type] ? map[action.type]() : state
}

const supply:Reducer<Nos|undefined, FSA> = (supply = 0, action) => {
  if (action.type === DEPLOY_TOKEN) return action.payload.supply
  return supply
}

const transfers:Reducer<Transfer[]|undefined, FSA> = (state = [], action) => {
  const map = {
    [TRANSFER]: () => ([
      ...state,
      {
        to: action.payload.to,
        from: action.payload.from,
        amount: action.payload.amount,
      }
    ]),
  }

  // @ts-ignore:7017
  return map[action.type] ? map[action.type]() : state
}

export default combineReducers({
  address,
  supply,
  approvals,
  transfers,
})
