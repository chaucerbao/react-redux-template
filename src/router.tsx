// Dependencies
import React from 'react'
import { connect } from 'react-redux'
import { LocationState } from 'redux-first-router'
import Loadable from 'react-loadable'

import { State } from 'store'
import * as ROUTES from 'routes'
import Loading from 'components/loading'
import NotFound from 'pages/not-found'

// Type definitions
interface Props {
  state: {
    location: LocationState
  }
}

// Asynchronous page loader
const AsyncPage = (loader: () => Promise<any>) =>
  Loadable({ loader, loading: Loading })

// Pages
const Home = AsyncPage(() => import('pages/home'))
const Login = AsyncPage(() => import('pages/login'))

// Router
const Router = ({ state }: Props) => {
  switch (state.location.type) {
    case ROUTES.HOME:
      return <Home />
    case ROUTES.LOGIN:
      return <Login />
    default:
      return <NotFound />
  }
}

// State to props
const mapStateToProps = (state: State) => ({
  state: {
    location: state.location
  }
})

// Exports
export default connect(mapStateToProps)(Router)
