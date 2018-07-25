import { DEPLOY_ATTRIBUTE_STORE, DEPLOYED_ATTRIBUTE_STORE, RESET_ATTRIBUTE_STORE } from '../../constants'
import { FSA, Reducer } from '../../interfaces'

const attributeStoreAddress:Reducer<string|undefined, FSA> = (address = '', action) => {
  if (action.type === DEPLOYED_ATTRIBUTE_STORE) return action.payload.address
  if (action.type === RESET_ATTRIBUTE_STORE) return ''
  return address
}

export default attributeStoreAddress
