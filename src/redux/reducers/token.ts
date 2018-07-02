/**
 * Top level reducer for the token state pieces.
 * Subdivides the responsibility of managing:
 * * token
 * * approvals
 * * transfers
 */

import { combineReducers } from 'redux'
import { Nos } from 'computable/dist/types'
import Erc20 from 'computable/dist/contracts/erc-20'
import {
  DEPLOY_TOKEN,
  DEPLOYED_TOKEN,
  APPROVE,
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

// @ts-ignore:2322
const contract:Reducer<Erc20|undefined, FSA> = (erc20 = null, action) => {
  if (action.type === DEPLOYED_TOKEN) return action.payload.contract
  return erc20
}

const approvals:Reducer<Approval[]|undefined, FSA> = (state = [], action) => {
  const map = {
    // we will add an applicant to the state tree
    [APPROVE]: () => ([
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
  contract,
  supply,
  approvals,
  transfers,
})
