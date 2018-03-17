// Dependencies
import produce from 'immer'
import { Dispatch } from 'redux'
import { Action, createAction, handleActions } from 'redux-actions'
import { State as StoreState } from 'store'
import { cacheUsers, User } from 'store/users'

// Type definitions
interface AuthUser extends User {
  authToken: string
}
export type State = AuthUser | null

// Default state
const defaultState = null

// Actions
const setAuthUser = createAction<AuthUser>('ME/LOG_IN')
export const logout = createAction('ME/LOG_OUT')

// Thunk actions
export const login = (_email: string, _password: string) => async (
  dispatch: Dispatch<StoreState>,
  getState: () => StoreState
) => {
  const user = await fetch('http://jsonplaceholder.typicode.com/users/1').then(
    response => response.json()
  )

  if (user) {
    dispatch(cacheUsers([user]))

    dispatch(setAuthUser({ ...getState().users._cache[1], authToken: '' }))
  }
}

// Reducer
export default handleActions<State, any>(
  {
    [setAuthUser.toString()]: (state, { payload }: Action<AuthUser>) =>
      produce(state, () => payload),

    [logout.toString()]: state => produce(state, () => null)
  },
  defaultState
)
