// Import basic react stuff
import React, { Component } from 'react';
// Import state stuff
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { SortDirection } from 'react-virtualized';
// Import server actions
import { getExpenses, selectExpense, sortedExpenses } from '../../../actions/expenseActions';
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

  // Update the table with any new or deleted expenses
  componentWillReceiveProps(nextProps) {
    const thisExpenses = JSON.stringify(this.props.expense.expenses);
    const nextExpenses = JSON.stringify(nextProps.expense.expenses);
    if ( thisExpenses !== nextExpenses ) {
      const { expenses } = nextProps.expense;
      const nextList = expenses.sort(this.sortList(this.state.sortBy));
      this.setState({sortedList: nextList});
    }
  }
  // Define prop types
  static propTypes = {
    getExpenses: PropTypes.func.isRequired,
    selectExpense: PropTypes.func,
    sortedExpenses: PropTypes.func,
    expense: PropTypes.object.isRequired
  }
  state = {
    sortedList: this.props.expense.expenses,
    sortBy: 'date',
    sortDirection: SortDirection.DESC,
    prevSortBy: null,
    prevSortDirection: null
  };

  // Delete the selected expense from the state/server
  onDelete = expenseID => { this.props.deleteExpense(expenseID); };
  // Set the state's selected row for highlighting & editing
  onRowClick = ({ event, index, rowData }) => {
    this.props.selectExpense(rowData, index);
  }
  // Produce a sort function to sort expenses by the given key
  sortList = (dataKey) => {
    return (a, b) => {
      if      (!a[dataKey]) return 1
      else if (!b[dataKey]) return -1
      else if (a[dataKey] < b[dataKey])
        return -1;
      else if (a[dataKey] > b[dataKey])
        return 1;
      else return 0;
    };
  }
  // Sort the table by the clicked header
  onHeaderClick = ({ columnData, dataKey, event }) => {
    // Make the next sorted expenses list
    const nextSort = this.props.expense.expenses.sort(this.sortList(dataKey));
    // Set the state variables with the updated list
    this.setState({ sortBy: dataKey,
                    sortDirection: this.state.sortDirection ===
                    SortDirection.DESC ? SortDirection.ASC : SortDirection.DESC,
                    sortedList: this.state.sortDirection ===
                    SortDirection.DESC ? nextSort : nextSort.reverse()
                  });
    // Deselect the selected row or move the index
    this.props.sortedExpenses();
  }

  render () {
    const { columns } = this.props.expense;
    const { selectedRow } = this.props.expense;
    return (
      <div className={tableContainerClasses + "col-span-5 sm:col-span-4"}>
        <DataTable
          data={this.state.sortedList}
          cols={columns}
          sortBy={this.state.sortBy}
          sortDirection={this.state.sortDirection}
          onHeaderClick={this.onHeaderClick}
          onRowClick={this.onRowClick}
          selectedRow={selectedRow} />
      </div>
    )
  };
};

export default connect(mapStateToProps, { getExpenses, selectExpense, sortedExpenses })(ExpenseTable);
