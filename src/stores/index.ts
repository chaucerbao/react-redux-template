// Dependencies
import createHistory from 'history/createBrowserHistory'
import {
  Middleware,
  applyMiddleware,
  combineReducers,
  compose,
  createStore
} from 'redux'
import { LocationState, connectRoutes } from 'redux-first-router'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import routes from 'routes'

// Reducers
import users, { State as UsersState } from './users/reducer'

// Type definitions
export interface State {
  location: LocationState
  users: UsersState
}

// Router
const history = createHistory()
const {
  enhancer: locationEnhancer,
  middleware: locationMiddleware,
  reducer: locationReducer
} = connectRoutes(history, routes)

// Middleware
const middleware: Middleware[] = [locationMiddleware, thunk]
if (process.env.NODE_ENV !== 'production') {
  middleware.push(logger)
}

// Store
export default createStore(
  combineReducers({
    location: locationReducer,
    users
  }),
  compose(locationEnhancer, applyMiddleware(...middleware))
)
