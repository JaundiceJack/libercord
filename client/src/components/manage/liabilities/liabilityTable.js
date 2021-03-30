import Table from '../table.js';
import React, { Component } from 'react';
// Connect redux to manage the state
import { connect } from 'react-redux';
import { getLiabilities, deleteLiability } from '../../../actions/liabilityActions.js';
import PropTypes from 'prop-types';

// Define table columns
const columns = [
  { title: "Liability",    field: "name", },
  { title: "Category", field: "category", hidden: false },
  { title: "Value",    field: "value",    type: 'currency', defaultSort: 'desc' },
  { title: "Interest", field: "interest"}
]

class LiabilityTable extends Component {
  // Check for liability retrieval
  componentDidMount(){ this.props.getLiabilities(); };
  // Delete the selected liability from the state/server
  onDelete = liabilityID => { this.props.deleteLiability(liabilityID); };

  render () {
    const { liabilities } = this.props.liability;
    return (
      <Table data={liabilities} columns={columns} onDelete={this.onDelete}/>
    )
  };
};

// Define prop-types
LiabilityTable.propTypes = {
  getLiabilities: PropTypes.func.isRequired,
  deleteLiability: PropTypes.func,
  liability: PropTypes.object.isRequired
}

// Map the redux state to the component properties
const mapStateToProps = (state) => ({
  liability: state.liability
})

export default connect(mapStateToProps,
   { getLiabilities, deleteLiability })
   (LiabilityTable);
