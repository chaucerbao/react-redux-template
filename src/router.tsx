// Dependencies
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Loadable from 'react-loadable'

import Loading from 'components/loading'
import NotFound from 'pages/not-found'

// Asynchronous page loader
const AsyncPage = (loader: () => Promise<any>) =>
  Loadable({ loader, loading: Loading })

// Pages
const Home = AsyncPage(() => import('pages/home'))
const Login = AsyncPage(() => import('pages/login'))

// Router
const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
)

// Exports
export default Router
