import store from '../store'

const dispatcher = async (actionCreator: any): Promise<any> =>
  store.dispatch(actionCreator)

export { dispatcher }

