import store from '../store'
import {
  resetTokenAddress,
  resetTokenApprove,
  resetTokenTransfer,
} from '../action-creators/token'

const resetToken = (): void => {
  store.dispatch(resetTokenAddress())
  store.dispatch(resetTokenApprove())
  store.dispatch(resetTokenTransfer())
}

export { resetToken }

