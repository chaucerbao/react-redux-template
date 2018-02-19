// Dependencies
import React from 'react'
import { connect } from 'react-redux'
import { State } from 'stores'
import * as ROUTES from 'routes'
import { LocationState } from 'redux-first-router'

// Pages
import Home from './pages/home'
import NotFound from './pages/not-found'

// Type definitions
interface Props {
  state: {
    location: LocationState
  }
}

// Router
const Router = ({ state }: Props) => {
    switch (state.location.type) {
      case ROUTES.HOME:
        return <Home />
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
