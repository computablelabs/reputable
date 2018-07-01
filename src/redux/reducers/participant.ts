import { PARTICIPATE, RESET_PARTICIPANTS } from '../../constants'
import {
  Action,
  FSA,
  Reducer,
  Participant,
} from '../../interfaces'


const participants:Reducer<Participant[], Action> = (state = [], action) => {
  const map = {
    // we will add an applicant to the state tree
    [PARTICIPATE]: () => ([
      ...state,
      {
        name: (<FSA>action).payload.name,
        address: (<FSA>action).payload.address,
        owner: state.length === 0 ? true : false,
      }
    ]),

    [RESET_PARTICIPANTS]: () => ([]),
  }

  // @ts-ignore:7017 TODO WHY? None of the others do this!
  return map[action.type] ? map[action.type]() : state
}

export default participants
