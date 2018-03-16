// Dependencies
import React from 'react'
import Link from 'components/link'

// Type definitions
interface Props {
  children: React.ReactNode
}

// Layout
const DefaultLayout = (props: Props) => (
  <React.Fragment>
    <header>
      <nav>
        <Link to="/">Home</Link>
        &nbsp;
        <Link to="/login">Login</Link>
        &nbsp;
        <Link to="/not-found">Page not found</Link>
      </nav>
    </header>

    <main>{props.children}</main>

    <footer>&copy; Copyright {new Date().getFullYear()}</footer>
  </React.Fragment>
)

// Exports
export default DefaultLayout
