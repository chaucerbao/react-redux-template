import fetch from "isomorphic-fetch";

const baseUrl = "http://localhost:8080";

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
    items: json.items
  }
}

export function fetchItems() {
  return dispatch => {
    dispatch(loadItems());

    return fetch(`${baseUrl}/api`)
      .then(response => {
        if (response.status === 200) {
          return dispatch(itemsLoaded(response.json()));
        }

        return dispatch(fetchFailed(response));
      })
      .catch(fetchFailed);
  };
}

export const REQUEST_FAILED = "REQUEST_FAILED";
function fetchFailed() {
  return {
    type: REQUEST_FAILED
  }
}
