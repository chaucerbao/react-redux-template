// Dependencies
import { combineReducers } from "redux";

// Reducers
import { routerReducer } from "react-router-redux";
import branch from "./branch/reducers";

export default combineReducers({
  routing: routerReducer,
  branch
});
