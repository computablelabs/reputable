import store from '../store'
import { APPLY } from '../../constants'
import { Apply, List, ChallengeAction } from '../../interfaces'
import { Nos } from 'computable/dist/types'

const apply = (name:string, deposit?:Nos, data?:string): void => {
  const o:Apply = {
    type: APPLY,
    name,
    deposit,
    data,
  }

  store.dispatch(o) // this should move an application into the applicants list

  // now we listen for the protocol lib to send back the TX and inspect, dispatching an action
  // to add a proper listing if it succeeds...
  //
  // TODO use the websocket events when ready

}

export { apply }
