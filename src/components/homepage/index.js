// Dependencies
import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchItems } from "store/branch/actions";

// Styles
import "./style.css";

// Component
const Homepage = ({ actions, branch }) => {
  function loadItems(e) {
    e.preventDefault();
    actions.fetchItems();
  }

  return (
    <div className="homepage">
      <h1>Homepage</h1>
      <br /><a href="#loadItems" onClick={ loadItems.bind(this) }>Load items</a>
      { branch.isLoading && <span><br /><br />Loading...</span> }
    </div>
  );
};

// Property validation
Homepage.propTypes = {
  actions: PropTypes.object.isRequired,
  branch: PropTypes.object.isRequired
};

// Map Redux state into props
function mapStateToProps(state) {
  return {
    branch: state.branch
  };
}

// Map Redux actions into props
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ fetchItems }, dispatch)
  };
}

// Connect React component to Redux
export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
