// Dependencies
import React from 'react'
import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'
import { State } from 'stores'
import { fetchUsers } from 'stores/users/actions'
import { User } from 'stores/users/reducer'
import { sortMapBy } from 'lib/selectors'
import Loading from 'components/loading'

// Type definitions
interface Props {
  state: {
    users: Pick<State['users'], '_cache' | 'isLoading'>
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
      <div>
        <h1>Homepage</h1>

        {state.users.isLoading ? (
          <Loading />
        ) : (
          sortedUsers.map(user => (
            <div key={`user:${user.id}`}>{user.name}</div>
          ))
        )}
      </div>
    )
  }
}

// State to props
const mapStateToProps = (state: State) => ({
  state: {
    users: {
      _cache: state.users._cache,
      isLoading: state.users.isLoading
    }
  }
})

// Dispatch to props
const mapDispatchToProps = (dispatch: Dispatch<State>) => ({
  dispatch: bindActionCreators({ fetchUsers }, dispatch)
})

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Home)
