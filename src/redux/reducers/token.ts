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
  TRANSFER,
} from '../../constants'
import {
  Action,
  Reducer,
  DeployToken,
  DeployedToken,
  Token,
  Approve,
  Approval,
  TransferAction,
  Transfer,
} from '../../interfaces'

const address:Reducer<string|undefined, Action> = (address = '', action) => {
  // we won't have an actual address until the VM sends back the TX from deploy
  if (action.type === DEPLOYED_TOKEN) return (<DeployedToken>action).address
  return address
}

const approvals:Reducer<Approval[]|undefined, Action> = (state = [], action) => {
  const map = {
    // we will add an applicant to the state tree
    [APPROVE]: () => ([
      ...state,
      {
        address: (<Approve>action).address,
        amount: (<Approve>action).amount,
        from: (<Approve>action).from,
      }
    ]),
  }

  return map[action.type] ? map[action.type]() : state
}

const supply:Reducer<Nos|undefined, Action> = (supply = 0, action) => {
  if (action.type === DEPLOY_TOKEN) return (<DeployToken>action).supply
  return supply
}

const transfers:Reducer<Transfer[]|undefined, Action> = (state = [], action) => {
  const map = {
    [TRANSFER]: () => ([
      ...state,
      {
        to: (<TransferAction>action).to,
        from: (<TransferAction>action).from,
        amount: (<TransferAction>action).amount,
      }
    ]),
  }

  return map[action.type] ? map[action.type]() : state
}

export default combineReducers({
  address,
  supply,
  approvals,
  transfers,
})
