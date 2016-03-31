// Dependencies
import { combineReducers } from "redux";

// Reducers
import { routerReducer } from "react-router-redux";
import items from "./items/reducers";

export default combineReducers({
  routing: routerReducer,
  items
});
