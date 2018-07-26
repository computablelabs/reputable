import { PARTICIPATE, RESET_PARTICIPANTS } from '../../constants'
import {
  FSA,
  Reducer,
  ReductionMap,
  Participant,
} from '../../interfaces'


const participants:Reducer<Participant[], FSA> = (state = [], action) => {
  const map:ReductionMap = {
    // we will add an applicant to the state tree
    [PARTICIPATE]: () => ([
      ...state,
      {
        name: action.payload.name,
        address: action.payload.address,
        owner: state.length === 0 ? true : false,
      }
    ]),

    [RESET_PARTICIPANTS]: () => ([]),
  }

  return map[action.type] ? map[action.type]() : state
}

export default participants
