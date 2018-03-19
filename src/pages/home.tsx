// Dependencies
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { State as StoreState } from 'store'
import { selectIsLoading, selectUsers, fetchUsers, User } from 'store/users'
import DefaultLayout from 'pages/layouts/default'
import Button from 'components/button'
import Loading from 'components/loading'

// Type definitions
interface Props {
  state: {
    isLoading: boolean
    users: User[]
  }
  dispatch: {
    fetchUsers: typeof fetchUsers
  }
}

// Page
class Home extends React.Component<Props> {
  componentWillMount() {
    this.props.dispatch.fetchUsers()
  }

  render() {
    const { state } = this.props

    return (
      <DefaultLayout>
        <h1>Homepage</h1>

        {state.isLoading ? (
          <Loading />
        ) : (
          state.users.map(user => (
            <div key={`user:${user.id}`}>{user.name}</div>
          ))
        )}

        <Button to="/login">Button link to login</Button>
      </DefaultLayout>
    )
  }
}

// State
const mapStateToProps = (state: StoreState) => ({
  state: {
    isLoading: selectIsLoading(state),
    users: selectUsers(state)
  }
})

// Dispatch
const mapDispatchToProps = (dispatch: Dispatch<StoreState>) => ({
  dispatch: bindActionCreators({ fetchUsers }, dispatch)
})

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Home)
