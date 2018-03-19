// Dependencies
import produce from 'immer'
import { Dispatch } from 'redux'
import { createAction, handleActions, Action } from 'redux-actions'
import { createSelector } from 'reselect'
import { State as StoreState } from 'store'
import { orderBy } from 'lib/helper'

// Type definitions
export interface State {
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

// Selectors
export const selectUsers = createSelector(
  (state: StoreState) => state.users._cache,
  users =>
    orderBy<User>('name')(Object.values(users))
)
export const selectIsLoading = (state: StoreState) => state.users.isLoading

// Actions
const setLoading = createAction<boolean>('USERS/SET_LOADING')
export const cacheUsers = createAction<User[]>('USERS/CACHE_USERS')

// Thunk actions
export const fetchUsers = () => async (
  dispatch: Dispatch<StoreState>,
  getState: () => StoreState
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
