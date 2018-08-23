import store from '../store'

const dispatcher = async (actionCreator: any): Promise<any> => (
  await store.dispatch(actionCreator)
)

export { dispatcher }

