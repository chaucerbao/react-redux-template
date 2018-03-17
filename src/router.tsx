// Dependencies
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Loadable from 'react-loadable'
import Loading from 'components/loading'
import ProtectedRoute from 'components/protected-route'
import NotFound from 'pages/not-found'
import Logout from 'pages/logout'

// Asynchronous page loader
const AsyncPage = (loader: () => Promise<any>) =>
  Loadable({ loader, loading: Loading })

// Pages
const Home = AsyncPage(() => import('pages/home'))
const Login = AsyncPage(() => import('pages/login'))
const Secret = AsyncPage(() => import('pages/secret'))

// Router
const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/Logout" component={Logout} />
      <ProtectedRoute path="/secret" component={Secret} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
)

// Exports
export default Router
