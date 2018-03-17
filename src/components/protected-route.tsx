// Dependencies
import React from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { State as StoreState } from 'store'

// Type definitions
interface Props extends RouteProps {
  state: {
    me: StoreState['me']
  }
}

// Component
const ProtectedRoute = ({ state, ...restProps }: Props) =>
  state.me ? <Route {...restProps} /> : <Redirect to={`/login?${restProps!.location!.pathname}${encodeURIComponent(restProps!.location!.search)}`} />

// State
const mapStateToProps = (state: StoreState) => ({
  state: {
    me: state.me
  }
})

// Exports
export default connect(mapStateToProps)(ProtectedRoute)
