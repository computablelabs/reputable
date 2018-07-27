/**
 * Top level reducer for the registry state pieces.
 * Subdivides the responsibility of managing:
 * * applicants
 * * challenges
 * * listings
 */

import { combineReducers } from 'redux'
import { Nos } from 'computable/dist/types'
import {
  DEPLOY_REGISTRY,
  DEPLOYED_REGISTRY,
  RESET_REGISTRY,
  APPLY,
  LIST,
  CHALLENGE
} from '../../constants'
import {
  FSA,
  Reducer,
  ReductionMap,
  Applicant,
  Challenge,
  Listing,
} from '../../interfaces'

const address:Reducer<string|undefined, FSA> = (address = '', action) => {
  const map:ReductionMap = {
    [DEPLOYED_REGISTRY]: () => action.payload.address,

    [RESET_REGISTRY]: () => '',
  }

  return map[action.type] ? map[action.type]() : address
}

const applicants:Reducer<Applicant[]|undefined, FSA> = (state = [], action) => {
  const map:ReductionMap = {
    // we will add an applicant to the state tree
    [APPLY]: () => ([
      ...state,
      {
        name: action.payload.name,
        deposit: action.payload.deposit,
        data: action.payload.data,
      }
    ]),

    [RESET_REGISTRY]: () => ([]),
  }

  return map[action.type] ? map[action.type]() : state
}

// TODO this
const challenges:Reducer<Challenge[]|undefined, FSA> = (state = [], action) => {
  const map:ReductionMap = {
    [CHALLENGE]: () => ([
      ...state,
      {

      }
    ]),

    [RESET_REGISTRY]: () => ([]),
  }

  return map[action.type] ? map[action.type]() : state
}

const listings:Reducer<Listing[]|undefined, FSA> = (state = [], action) => {
  const map:ReductionMap = {
    // LIST action invoked when the ETHVM returns us the listing
    [LIST]: () => ([
      ...state,
      {
        hash: action.payload.hash, // remember this does not come back from VM, we supply
        applicationExpiry: action.payload.applicationExpiry,
        whitelisted: action.payload.whitelisted,
        owner: action.payload.owner,
        unstakedDeposit: action.payload.unstakedDeposit,
        // NOTE: there won't be a challengeID on the initial LIST action
      }
    ]),

    [RESET_REGISTRY]: () => ([]),
  }

  return map[action.type] ? map[action.type]() : state
}

export default combineReducers({
  address,
  applicants,
  challenges,
  listings,
})
