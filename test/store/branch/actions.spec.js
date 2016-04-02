// Dependencies
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import sinon from "sinon";
import nock from "nock";
import { expect } from "chai";

// Actions
import * as actions from "../../../src/store/branch/actions";

// Mock store
const mockStore = configureMockStore([thunk]);

describe("Branch", () => {
  let dateStub;

  // Setup
  beforeEach(() => {
    dateStub = sinon.stub(Date, "now", () => 12345);
  });

  // Teardown
  afterEach(() => {
    dateStub.restore();
    nock.cleanAll();
  });

  // loadItems()
  it("returns an action to request items", () => {
    expect(actions.loadItems()).to.deep.equal({
      type: actions.REQUEST_ITEMS
    });
  });

  // itemsLoaded(json)
  it("returns an action to populate the items received", () => {
    expect(actions.itemsLoaded({
      items: [{ id: 1 }]
    })).to.deep.equal({
      type: actions.RECEIVE_ITEMS,
      updatedAt: 12345,
      items: [{ id: 1 }]
    });
  });

  // fetchItems(): Success
  it("successfully fetches items", (done) => {
    const store = mockStore();

    nock("http://localhost:8080/").get("/api").reply(200);

    store.dispatch(actions.fetchItems())
      .then(() => {
        let history = store.getActions();

        expect(history[0]).to.have.property("type", actions.REQUEST_ITEMS);
        expect(history[1]).to.have.property("type", actions.RECEIVE_ITEMS);
      })
      .then(done);
  });

  // fetchItems(): Failure
  it("failes to fetch items", (done) => {
    const store = mockStore();

    nock("http://localhost:8080/").get("/api").reply(404);

    store.dispatch(actions.fetchItems())
      .then(() => {
        let history = store.getActions();

        expect(history[0]).to.have.property("type", actions.REQUEST_ITEMS);
        expect(history[1]).to.have.property("type", actions.REQUEST_FAILED);
      })
      .then(done);
  });
});
