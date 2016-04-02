import fetch from "isomorphic-fetch";

const baseUrl = "http://localhost:8080";

export const REQUEST_ITEMS = "REQUEST_ITEMS";
export function requestItems() {
  return {
    type: REQUEST_ITEMS
  }
}

export const RECEIVE_ITEMS = "RECEIVE_ITEMS";
export function receiveItems(json) {
  return {
    type: RECEIVE_ITEMS,
    updatedAt: Date.now(),
    items: json.items
  }
}

export function fetchItems() {
  return dispatch => {
    dispatch(requestItems());

    return fetch(`${baseUrl}/api`)
      .then(response => {
        if (response.status === 200) {
          return dispatch(receiveItems(response.json()));
        }

        return dispatch(fetchItemsFailed(response));
      })
      .catch(fetchItemsFailed);
  };
}

export const FETCH_ITEMS_FAILED = "FETCH_ITEMS_FAILED";
function fetchItemsFailed() {
  return {
    type: FETCH_ITEMS_FAILED
  }
}
