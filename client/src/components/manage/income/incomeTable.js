import Table from '../table.js';
// Connect redux to manage the state
import { connect } from 'react-redux';
import { getIncomes, deleteIncome } from '../../../actions/incomeActions.js';
import PropTypes from 'prop-types';

import React, { Component } from 'react';

// Define table columns
const columns = [
  { title: "Income",  field: "category", hidden: false },
  { title: "Received",    field: "value", type: 'currency' },
  { title: "Date",    field: "date", type: 'date', defaultSort: 'desc' }
]

class IncomeTable extends Component {
  // Check for income retrieval
  componentDidMount(){ this.props.getIncomes(); };
  // Delete the selected income from the state/server
  onDelete = incomeID => { this.props.deleteIncome(incomeID); };

  render () {
    const { incomes } = this.props.income;
    return (
      <Table data={incomes} columns={columns} onDelete={this.onDelete} />
    )
  };
};

// Define prop-types
IncomeTable.propTypes = {
  getIncomes: PropTypes.func.isRequired,
  deleteIncome: PropTypes.func,
  income: PropTypes.object.isRequired
}

// Map the redux state to the component properties
const mapStateToProps = (state) => ({
  income: state.income
})

export default connect(mapStateToProps,
   { getIncomes, deleteIncome })
   (IncomeTable);
