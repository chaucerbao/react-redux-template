// Dependencies
import { expect } from "chai";

// Reducer
import reducer from "../../../src/store/branch/reducers";
import { REQUEST_ITEMS, RECEIVE_ITEMS } from "../../../src/store/branch/actions";

describe("Branch reducer", () => {
  // Default
  it("returns the initial state", () => {
    expect(reducer(undefined, {})).to.deep.equal({
      isLoading: false,
      updatedAt: null,
      items: []
    });
  });

  // REQUEST_ITEMS
  it("requests items", () => {
    expect(reducer({
      isLoading: false
    }, {
      type: REQUEST_ITEMS
    })).to.have.property("isLoading", true);
  });

  // RECEIVE_ITEMS
  it("receives items", () => {
    expect(reducer({
      isLoading: true,
      updatedAt: null,
      items: []
    }, {
      type: RECEIVE_ITEMS,
      updatedAt: 12345,
      items: [{ id: 1 }, { id: 2 }]
    })).to.deep.equal({
      isLoading: false,
      updatedAt: 12345,
      items: [{ id: 1 }, { id: 2 }]
    });
  });
});
