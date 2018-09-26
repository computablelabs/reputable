// Local Dependencies
import { Map, EventLog } from '../../../interfaces'
import {
  tokenApproveOk,
  tokenTransferOk,
} from '../../action-creators/token'

const approvalEventResponder = (dispatch: Function, getState: Function) => (
  async (log: EventLog) => {
    const eventValues: Map = log.returnValues

    const out: any = {
      address: eventValues.spender,
      from:    eventValues.owner,
      amount:  eventValues.value,
    }

    dispatch(tokenApproveOk(out))
  }
)

const transferEventResponder = (dispatch: Function, getState: Function) => (
  async (log: EventLog) => {
    const eventValues: Map = log.returnValues

    const out: any = {
      from:   eventValues.from,
      to:     eventValues.to,
      amount: eventValues.value,
    }

    dispatch(tokenTransferOk(out))
  }
)

export {
  approvalEventResponder,
  transferEventResponder,
}

