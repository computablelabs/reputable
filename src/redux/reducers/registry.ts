/**
 * Top level reducer for the registry state pieces.
 * Subdivides the responsibility of managing:
 * * applicants
 * * challenges
 * * listings
 */

import { combineReducers } from 'redux'
import { APPLY, LIST, CHALLENGE } from '../../constants'
import { Nos } from 'computable/dist/types'
import {
  FSA,
  Reducer,
  Applicant,
  Challenge,
  Listing,
} from '../../interfaces'

const applicants:Reducer<Applicant[]|undefined, FSA> = (state = [], action) => {
  const map = {
    // we will add an applicant to the state tree
    [APPLY]: () => ([
      ...state,
      {
        name: action.payload.name,
        deposit: action.payload.deposit,
        data: action.payload.data,
      }
    ]),
  }

  // @ts-ignore:7017
  return map[action.type] ? map[action.type]() : state
}

// TODO this
const challenges:Reducer<Challenge[]|undefined, FSA> = (state = [], action) => {
  const map = {
    [CHALLENGE]: () => ([
      ...state,
      {

      }
    ]),
  }

  // @ts-ignore:7017
  return map[action.type] ? map[action.type]() : state
}

const listings:Reducer<Listing[]|undefined, FSA> = (state = [], action) => {
  const map = {
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
  }

  // @ts-ignore:7017
  return map[action.type] ? map[action.type]() : state
}

export default combineReducers({
  applicants,
  challenges,
  listings,
})
