// Dependencies
import produce from 'immer'
import { AnyAction } from 'redux'
import { CACHE_USERS, SET_LOADING } from './actions'

// Type definitions
export interface User {
  id: string
  name: string
}

export interface State {
  _cache: { [key: string]: User }
  isLoading: boolean
}

// Default state
const defaultState = {
  _cache: {},
  isLoading: false
}

// Reducer
export default (state: State = defaultState, action: AnyAction) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_LOADING:
        draft.isLoading = action.isLoading
        break
      case CACHE_USERS:
        draft._cache = action.users.reduce(
          (cache: State['_cache'], user: User) => {
            cache[user.id] = { ...cache[user.id], ...user }

            return cache
          },
          draft._cache
        )
        break
      default:
    }
  })
