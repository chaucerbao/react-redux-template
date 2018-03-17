// Dependencies
import React from 'react'
import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'
import { State as StoreState } from 'store'
import { fetchUsers, User } from 'store/users'
import { sortMapBy } from 'lib/selectors'
import DefaultLayout from 'pages/layouts/default'
import Button from 'components/button'
import Loading from 'components/loading'

// Type definitions
interface Props {
  state: {
    users: Pick<StoreState['users'], '_cache' | 'isLoading'>
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
    const sortedUsers = sortMapBy<User>('name')(state.users._cache)

    return (
      <DefaultLayout>
        <h1>Homepage</h1>

        {state.users.isLoading ? (
          <Loading />
        ) : (
          sortedUsers.map(user => (
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
    users: {
      _cache: state.users._cache,
      isLoading: state.users.isLoading
    }
  }
})

// Dispatch
const mapDispatchToProps = (dispatch: Dispatch<StoreState>) => ({
  dispatch: bindActionCreators({ fetchUsers }, dispatch)
})

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Home)
