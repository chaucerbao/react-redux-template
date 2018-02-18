// Dependencies
import { Dispatch } from 'redux'
import { State } from 'stores'
import { User } from './reducer'

// Actions
export const CACHE_USERS = 'USERS.CACHE_USERS'
export const cacheUsers = (users: User[]) => ({ type: CACHE_USERS, users })

export const SET_LOADING = 'USERS.SET_LOADING'
export const setLoading = (isLoading: boolean) => ({
  type: SET_LOADING,
  isLoading
})

// Thunks
export const FETCH_USERS = 'USERS.FETCH_USERS'
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
