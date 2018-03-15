// Dependencies
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

// Store
import store from './store'

// Router
import Router from './router'

// Mount
render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById('root')
)
