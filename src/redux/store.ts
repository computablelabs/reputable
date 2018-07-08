import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import root from './reducers/root'

export default createStore(root, applyMiddleware(thunk))
