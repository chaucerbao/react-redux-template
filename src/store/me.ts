// Dependencies
import produce from 'immer'
import { Dispatch } from 'redux'
import { createAction, handleActions, Action } from 'redux-actions'
import { State as StoreState } from 'store'
import { cacheUsers, User } from 'store/users'

// Type definitions
interface Me {
  accessToken: string
  user: User
}
export type State = Me | null

// Default state
const defaultState = null

// Selectors
export const selectIsLoggedIn = (state: StoreState) => !!state.me

// Actions
const setMe = createAction<Me>('ME/LOG_IN')
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
    dispatch(setMe({ accessToken: '', user: getState().users._cache[1] }))
  }
}

// Reducer
export default handleActions<State, any>(
  {
    [setMe.toString()]: (state, { payload }: Action<Me>) =>
      produce(state, () => payload),

    [logout.toString()]: state => produce(state, () => null)
  },
  defaultState
)
