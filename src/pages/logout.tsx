// Dependencies
import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'
import { State as StoreState } from 'store'
import { logout } from 'store/me'

// Type definitions
interface Props {
  dispatch: {
    logout: typeof logout
  }
}

// Page
class Logout extends React.Component<Props> {
  componentWillMount() {
    this.props.dispatch.logout()
  }

  render() {
    return (
      <Redirect to="/" />
    )
  }
}

// Dispatch
const mapDispatchToProps = (dispatch: Dispatch<StoreState>) => ({
  dispatch: bindActionCreators({ logout }, dispatch)
})

// Exports
export default connect(null, mapDispatchToProps)(Logout)
