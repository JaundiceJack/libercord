import Table from '../table.js';
// Connect redux to manage the state
import { connect } from 'react-redux';
import { getExpenses, deleteExpense } from '../../../actions/expenseActions.js';
import PropTypes from 'prop-types';

import React, { Component } from 'react';

// Define table columns
const columns = [
  { title: "Expense",  field: "category", hidden: false },
  { title: "Paid",    field: "value", type: 'currency' },
  { title: "Date", field: "date", type: 'date', defaultSort: 'desc' }
]

class ExpenseTable extends Component {
  // Check for expense retrieval
  componentDidMount(){ this.props.getExpenses(); };
  // Delete the selected expense from the state/server
  onDelete = expenseID => { this.props.deleteExpense(expenseID); };

  render () {
    const { expenses } = this.props.expense;
    return (
      <Table data={expenses} columns={columns} onDelete={this.onDelete} />
    )
  };
};

// Define prop-types
ExpenseTable.propTypes = {
  getExpenses: PropTypes.func.isRequired,
  deleteExpense: PropTypes.func,
  expense: PropTypes.object.isRequired
}

// Map the redux state to the component properties
const mapStateToProps = (state) => ({
  expense: state.expense
})

export default connect(mapStateToProps,
   { getExpenses, deleteExpense })
   (ExpenseTable);
