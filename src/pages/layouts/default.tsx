// Dependencies
import React from 'react'
import Link from 'components/link'

// Type definitions
interface Props {
  children: any
}

// Layout
const DefaultLayout = (props: Props) => (
  <React.Fragment>
    <header key="layout__header">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/not-found">Page not found</Link>
      </nav>
    </header>

    <main key="layout__body">{props.children}</main>

    <footer key="layout__footer">
      &copy; Copyright {new Date().getFullYear()}
    </footer>
  </React.Fragment>
)

// Exports
export default DefaultLayout
