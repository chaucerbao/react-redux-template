// Dependencies
import produce from 'immer'
import { Dispatch } from 'redux'
import { createActions, handleActions } from 'redux-actions'

// Type definitions
export interface State {
  _cache: { [key: string]: User }
  isLoading: boolean
}

export interface User {
  id: string
  name: string
}

type Payload = boolean | User[]

// Default state
const defaultState = {
  _cache: {},
  isLoading: false
}

// Actions
export const { users: { setLoading, cacheUsers } } = createActions<Payload>({
  USERS: {
    SET_LOADING: isLoading => isLoading,
    CACHE_USERS: users => users
  }
})

// Thunk actions
export const fetchUsers = () => async (dispatch: Dispatch<State>) => {
  dispatch(setLoading(true))

  dispatch(
    cacheUsers(
      await fetch('http://jsonplaceholder.typicode.com/users').then(response =>
        response.json()
      )
    )
  )

  dispatch(setLoading(false))
}

// Reducer
export default handleActions<State, Payload>(
  {
    USERS: {
      SET_LOADING_USERS: (state, { payload }) =>
        produce(state, draft => {
          draft.isLoading = !!payload
        }),
      CACHE_USERS: (state, { payload }) =>
        produce(state, draft => {
          if (Array.isArray(payload)) {
            payload.forEach((user: User) => {
              draft._cache[user.id] = { ...draft._cache[user.id], ...user }
            })
          }
        })
    }
  },
  defaultState
)
