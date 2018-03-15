// Dependencies
import produce from 'immer'
import { Dispatch } from 'redux'
import { Action, createAction, handleActions } from 'redux-actions'

// Type definitions
export interface State {
  _cache: { [key: string]: User }
  isLoading: boolean
}

export interface User {
  id: string
  name: string
}

// Default state
const defaultState = {
  _cache: {},
  isLoading: false
}

// Actions
const setLoading = createAction<boolean>('USERS/SET_LOADING')
export const cacheUsers = createAction<User[]>('USERS/CACHE_USERS')

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
export default handleActions<State, any>(
  {
    [setLoading.toString()]: (state, { payload }: Action<boolean>) =>
      produce(state, draft => {
        draft.isLoading = !!payload
      }),
    [cacheUsers.toString()]: (state, { payload }: Action<User[]>) =>
      produce(state, draft => {
        if (payload) {
          payload.forEach(user => {
            draft._cache[user.id] = { ...draft._cache[user.id], ...user }
          })
        }
      })
  },
  defaultState
)
