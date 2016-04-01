import { REQUEST_ITEMS, RECEIVE_ITEMS } from "./actions";

const initialState = {
  isLoading: false,
  updatedAt: null,
  items: []
};

export default function branch(state = initialState, action) {
  switch (action.type) {
    case REQUEST_ITEMS:
      return Object.assign({}, state, {
        isLoading: true
      });
    case RECEIVE_ITEMS:
      return Object.assign({}, state, {
        isLoading: false,
        updatedAt: action.updatedAt,
        items: action.items
      });
    default:
      return state;
  }
};
