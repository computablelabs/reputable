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
  APPROVED,
  TRANSFER,
} from '../../constants'
import {
  FSA,
  Reducer,
  ReductionMap,
  Approval,
  Transfer
} from '../../interfaces'

const address:Reducer<string|undefined, FSA> = (address = '', action) => {
  const map:ReductionMap = {
    [DEPLOYED_TOKEN]: () => action.payload.address,

    [RESET_TOKEN]: () => '',
  }

  return map[action.type] ? map[action.type]() : address
}

// TODO create a state piece for an in-flight approval to handle APPROVE
const approvals:Reducer<Approval[]|undefined, FSA> = (state = [], action) => {
  const map:ReductionMap = {
    // we will add an applicant to the state tree
    [APPROVED]: () => ([
      ...state,
      {
        address: action.payload.address,
        amount: action.payload.amount,
        from: action.payload.from,
      }
    ]),

    [RESET_TOKEN]: () => ([]),
  }

  return map[action.type] ? map[action.type]() : state
}

const supply:Reducer<Nos|undefined, FSA> = (supply = 0, action) => {
  const map:ReductionMap = {
    [DEPLOY_TOKEN]: () => action.payload.supply,

    [RESET_TOKEN]: () => 0,
  }

  return map[action.type] ? map[action.type]() : supply
}

const transfers:Reducer<Transfer[]|undefined, FSA> = (state = [], action) => {
  const map:ReductionMap = {
    [TRANSFER]: () => ([
      ...state,
      {
        to: action.payload.to,
        from: action.payload.from,
        amount: action.payload.amount,
      }
    ]),


    [RESET_TOKEN]: () => ([]),
  }

  return map[action.type] ? map[action.type]() : state
}

export default combineReducers({
  address,
  supply,
  approvals,
  transfers,
})
