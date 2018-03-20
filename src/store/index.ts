// Dependencies
import {
  applyMiddleware,
  combineReducers,
  createStore,
  Middleware
} from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

// Reducers
import me, { State as MeState } from 'store/me'
import users, { State as UsersState } from 'store/users'

// Type definitions
export interface State {
  me: MeState
  users: UsersState
}

// Reducers
const reducers = {
  me,
  users
}

// Middleware
const middleware: Middleware[] = [thunk]
if (process.env.NODE_ENV !== 'production') {
  middleware.push(logger)
}

// Store
const store = createStore(
  persistReducer({ key: 'persistStore', storage }, combineReducers(reducers)),
  applyMiddleware(...middleware)
)

// Exports
export default store
export const persistor = persistStore(store)
