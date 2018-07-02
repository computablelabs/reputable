import { PARTICIPATE, RESET_PARTICIPANTS } from '../../constants'
import {
  FSA,
  Reducer,
  Participant,
} from '../../interfaces'


const participants:Reducer<Participant[], FSA> = (state = [], action) => {
  const map = {
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

  // @ts-ignore:7017
  return map[action.type] ? map[action.type]() : state
}

export default participants
