// Import basic react stuff
import React, { Component } from 'react';
// Import state stuff
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// Import server actions
import { deleteExpense, getExpenses } from '../../../actions/expenseActions';
// Import style presets
import { buttonClasses } from '../../tailwinds';

// Map the redux state to the component properties
const mapStateToProps = (state) => ({
  expense: state.expense
})

class DeleteExpense extends Component {
  // Check for expense retrieval
  componentDidMount(){ this.props.getExpenses();  };
  // Define prop types
  static propTypes = {
    getExpenses: PropTypes.func.isRequired,
    deleteExpense: PropTypes.func,
    expense: PropTypes.object.isRequired
  }

  // Prevent default submission and create the new expense
  onDelete = (e) => {
    e.preventDefault();
    // TODO: if no expense is selected, indicate
    this.props.deleteExpense(this.props.expense.selectedExpense._id);
    // Hide the form on submission
    this.props.toggleDelete();
  };


  render() {
    return (
      <button type="button"
              onClick={this.onDelete}
              className={buttonClasses+"mt-6 border-red-500 text-red-100"}>
        Delete Expense
      </button>
    );
  }
};

export default connect(mapStateToProps, { getExpenses, deleteExpense })(DeleteExpense);
