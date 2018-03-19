// Dependencies
import React from 'react'
import { Redirect, RouteProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { State as StoreState } from 'store'
import { login } from 'store/me'
import produce from 'immer'
import DefaultLayout from 'pages/layouts/default'
import Button from 'components/button'

// Type definitions
interface Props {
  state: {
    me: StoreState['me']
  }
  dispatch: {
    login: typeof login
  }
  location: RouteProps['location']
}
interface State {
  form: {
    email: string
    password: string
  }
}

// Page
class Login extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      form: {
        email: '',
        password: ''
      }
    }
  }

  updateField = (e: React.FormEvent<HTMLInputElement>) => {
    const field = e.currentTarget

    this.setState(
      produce((draft: State) => {
        draft.form[field.name as keyof State['form']] = field.value
      })
    )
  }

  submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { email, password } = this.state.form
    this.props.dispatch.login(email, password)
  }

  render() {
    if (this.props.state.me) {
      const path = this.props.location!.search

      return (
        <Redirect to={path ? decodeURIComponent(path.substring(1)) : '/'} />
      )
    }

    const { form } = this.state

    return (
      <DefaultLayout>
        <h1>Login</h1>

        <form onSubmit={this.submitForm}>
          <div>
            <label htmlFor="email">
              <span>E-mail address</span>
              <input
                id="email"
                name="email"
                value={form.email}
                type="email"
                onChange={this.updateField}
              />
            </label>
          </div>

          <div>
            <label htmlFor="password">
              <span>Password</span>
              <input
                id="password"
                name="password"
                value={form.password}
                type="password"
                onChange={this.updateField}
              />
            </label>
          </div>

          <Button type="submit">Submit</Button>
        </form>
      </DefaultLayout>
    )
  }
}

// State
const mapStateToProps = (state: StoreState) => ({
  state: {
    me: state.me
  }
})

// Dispatch
const mapDispatchToProps = (dispatch: Dispatch<StoreState>) => ({
  dispatch: bindActionCreators({ login }, dispatch)
})

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Login)
