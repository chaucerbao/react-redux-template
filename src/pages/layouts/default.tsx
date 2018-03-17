// Dependencies
import React from 'react'
import { connect } from 'react-redux'
import { State as StoreState } from 'store'
import Link from 'components/link'

// Type definitions
interface Props {
  state: {
    me: StoreState['me']
  }
  children: React.ReactNode
}

// Layout
const DefaultLayout = (props: Props) => (
  <React.Fragment>
    <header>
      <nav>
        <Link to="/">Home</Link>
        &nbsp;
        <Link to="/not-found">Page not found</Link>
        &nbsp;
        {props.state.me ? <Link to="/logout">Log out</Link> : <Link to="/login">Log in</Link>}
      </nav>
    </header>

    <main>{props.children}</main>

    <footer>&copy; Copyright {new Date().getFullYear()}</footer>
  </React.Fragment>
)

// State
const mapStateToProps = (state: StoreState) => ({
  state: {
    me: state.me
  }
})

// Exports
export default connect(mapStateToProps)(DefaultLayout)
