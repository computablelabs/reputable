import store from '../store'
import { resetAttributeStore as reset } from '../action-creators/attribute-store'

const resetAttributeStore = (): void => {
  store.dispatch(reset())
}

export { resetAttributeStore }

