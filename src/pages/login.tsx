// Dependencies
import React from 'react'
import produce from 'immer'
import DefaultLayout from 'pages/layouts/default'
import Button from 'components/button'

// Type definitions
interface State {
  form: {
    email: string
    password: string
  }
}

// Page
class Login extends React.Component<{}, State> {
  constructor(props: {}) {
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
  }

  render() {
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

// Exports
export default Login
