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
  Action,
  Reducer,
  Apply,
  Applicant,
  List,
  Listing,
  ChallengeAction,
  Challenge,
  Registry
} from '../../interfaces'

const applicants:Reducer<Applicant[]|undefined, Action> = (state = [], action) => {
  const map = {
    // we will add an applicant to the state tree
    [APPLY]: () => ([
      ...state,
      {
        name: (<Apply>action).name,
        deposit: (<Apply>action).deposit,
        data: (<Apply>action).data,
      }
    ]),
  }

  // @ts-ignore:7017
  return map[action.type] ? map[action.type]() : state
}

// TODO this
const challenges:Reducer<Challenge[]|undefined, Action> = (state = [], action) => {
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

const listings:Reducer<Listing[]|undefined, Action> = (state = [], action) => {
  const map = {
    // LIST action invoked when the ETHVM returns us the listing
    [LIST]: () => ([
      ...state,
      {
        hash: (<List>action).hash, // remember this does not come back from VM, we supply
        applicationExpiry: (<List>action).applicationExpiry,
        whitelisted: (<List>action).whitelisted,
        owner: (<List>action).owner,
        unstakedDeposit: (<List>action).unstakedDeposit,
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
