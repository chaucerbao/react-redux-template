// Global
import "babel-polyfill";
import "normalize.css/normalize.css";

// Dependencies
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import routes from "./router";

// Mount the application
render(
  <Provider store={store}>
    {routes(store)}
  </Provider>,

  document.getElementById("application")
);
