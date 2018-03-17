// Dependencies
import produce from 'immer'
import { Dispatch } from 'redux'
import { Action, createAction, handleActions } from 'redux-actions'
import { State } from 'store'

// Type definitions
export interface UsersState {
  _cache: { [key: number]: User }
  isLoading: boolean
}

export interface User {
  id: number
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
export const fetchUsers = () => async (
  dispatch: Dispatch<State>,
  getState: () => State
) => {
  if (Object.keys(getState().users._cache).length > 0) return

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
export default handleActions<UsersState, any>(
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
