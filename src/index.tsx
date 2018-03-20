// Dependencies
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

// Store
import store, { persistor } from 'store'

// Router
import Router from 'router'

// Mount
render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Router />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)
