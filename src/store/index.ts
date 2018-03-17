// Dependencies
import {
  Middleware,
  applyMiddleware,
  combineReducers,
  createStore
} from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

// Reducers
import users, { State as UsersState } from './users'

// Type definitions
export interface State {
  users: UsersState
}

// Middleware
const middleware: Middleware[] = [thunk]
if (process.env.NODE_ENV !== 'production') {
  middleware.push(logger)
}

// Store
export default createStore(
  combineReducers({
    users
  }),
  applyMiddleware(...middleware)
)
