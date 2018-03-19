// Dependencies
import {
  applyMiddleware,
  combineReducers,
  createStore,
  Middleware
} from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

// Reducers
import me, { State as MeState } from 'store/me'
import users, { State as UsersState } from 'store/users'

// Type definitions
export interface State {
  me: MeState
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
    me,
    users
  }),
  applyMiddleware(...middleware)
)
