import "./style.css";

import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchItems } from "store/branch/actions";

const Homepage = ({ actions, branch }) => {
  function loadItems(e) {
    e.preventDefault();
    actions.fetchItems();
  }

  return (
    <div className="homepage">
      <h1>Homepage</h1>
      <br /><a href="#loadItems" onClick={loadItems.bind(this)}>Load items</a>
      { branch.isLoading && <span><br /><br />Loading...</span> }
    </div>
  );
};

function mapStateToProps(state) {
  return {
    branch: state.branch
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ fetchItems }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
