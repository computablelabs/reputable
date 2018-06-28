import store from '../store'
import { PARTICIPATE, RESET_PARTICIPANTS } from '../../constants'
import { Action, Participate } from '../../interfaces'

const participate = (name:string, address:string): void => {
  const o:Participate = {
    type: PARTICIPATE,
    name,
    address,
  }

  store.dispatch(o)
}

const resetParticipants = (): void => {
  const o:Action = { type: RESET_PARTICIPANTS }
  store.dispatch(o)
}

export { participate, resetParticipants }
