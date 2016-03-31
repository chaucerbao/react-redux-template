// Dependencies
import React from "react";
import { syncHistoryWithStore } from "react-router-redux";
import { Router, Route, IndexRoute, browserHistory } from "react-router";

// Layouts
import DefaultLayout from "components/layout/default";

// Code-splitting the routes
function loadHomepage(location, callback) {
  require.ensure([], require => {
    callback(null, require("components/homepage").default);
  });
}

function loadNotFound404(location, callback) {
  require.ensure([], require => {
    callback(null, require("components/not-found-404").default);
  });
}

// Routes
export default function routes(store) {
  const history = syncHistoryWithStore(browserHistory, store);

  return (
    <Router history={history}>
      <Route path="/" component={DefaultLayout}>
        <IndexRoute getComponent={loadHomepage} />
        <Route path="*" getComponent={loadNotFound404} />
      </Route>
    </Router>
  );
};
