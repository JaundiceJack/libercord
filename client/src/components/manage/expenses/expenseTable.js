// Import basic react stuff
import React, { Component } from 'react';
// Import state stuff
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// Import server actions
import { getExpenses, deleteExpense } from '../../../actions/expenseActions';
// Import style presets
import { tableContainerClasses} from '../../tailwinds';
import DataTable from '../table';

// Map the redux state to the component properties
const mapStateToProps = (state) => ({
  expense: state.expense
})

class ExpenseTable extends Component {
  // Check for expense retrieval
  componentDidMount(){ this.props.getExpenses(); };
  // Define prop types
  static propTypes = {
    getExpenses: PropTypes.func.isRequired,
    deleteExpense: PropTypes.func,
    expense: PropTypes.object.isRequired
  }
  // Delete the selected expense from the state/server
  onDelete = expenseID => { this.props.deleteExpense(expenseID); };

  render () {
    const { expenses } = this.props.expense;
    const { columns } = this.props.expense;
    return (
      <div className={tableContainerClasses + "col-span-5 sm:col-span-4"}>
        <DataTable
          data={expenses.sort((a, b) =>
            { return (new Date(a.date)).getTime() - (new Date(b.date)).getTime() })}
          cols={columns}/>
      </div>
    )
  };
};

export default connect(mapStateToProps, { getExpenses, deleteExpense })(ExpenseTable);
