import fetch from "isomorphic-fetch";

export const REQUEST_ITEMS = "REQUEST_ITEMS";
export function loadItems() {
  return {
    type: REQUEST_ITEMS
  }
}

export const RECEIVE_ITEMS = "RECEIVE_ITEMS";
export function itemsLoaded(json) {
  return {
    type: RECEIVE_ITEMS,
    updatedAt: Date.now(),
    items: json
  }
}

export function fetchItems() {
  return dispatch => {
    dispatch(loadItems());

    setTimeout(() => {
      return fetch(`/api`)
        // .then(response => response.json())
        .then(json => dispatch(itemsLoaded(json)));
    }, 2000);
  };
}
