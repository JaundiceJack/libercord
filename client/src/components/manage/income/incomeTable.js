// Import basic react stuff
import React, { Component } from 'react';
// Import state stuff
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { SortDirection } from 'react-virtualized';
// Import server actions
import { getIncomes, selectIncome, sortedIncomes } from '../../../actions/incomeActions';
// Import style presets
import { tableContainerClasses} from '../../tailwinds';
import DataTable from '../table';

// Map the redux state to the component properties
const mapStateToProps = (state) => ({
  income: state.income
})

class IncomeTable extends Component {
  // Check for income retrieval
  componentDidMount(){ this.props.getIncomes(); };

  // Update the table with any new or deleted incomes
  componentWillReceiveProps(nextProps) {
    const thisIncomes = JSON.stringify(this.props.income.incomes);
    const nextIncomes = JSON.stringify(nextProps.income.incomes);
    if ( thisIncomes !== nextIncomes ) {
      const { incomes } = nextProps.income;
      const nextList = incomes.sort(this.sortList(this.state.sortBy));
      this.setState({sortedList: nextList});
    }
  }
  // Define prop types
  static propTypes = {
    getIncomes: PropTypes.func.isRequired,
    selectIncome: PropTypes.func,
    sortedIncomes: PropTypes.func,
    income: PropTypes.object.isRequired
  }
  state = {
    sortedList: this.props.income.incomes,
    sortBy: 'date',
    sortDirection: SortDirection.DESC,
    prevSortBy: null,
    prevSortDirection: null
  };

  // Delete the selected income from the state/server
  onDelete = incomeID => { this.props.deleteIncome(incomeID); };
  // Set the state's selected row for highlighting & editing
  onRowClick = ({ event, index, rowData }) => {
    this.props.selectIncome(rowData, index);
  }
  // Produce a sort function to sort incomes by the given key
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
    // Make the next sorted incomes list
    const nextSort = this.props.income.incomes.sort(this.sortList(dataKey));
    // Set the state variables with the updated list
    this.setState({ sortBy: dataKey,
                    sortDirection: this.state.sortDirection ===
                    SortDirection.DESC ? SortDirection.ASC : SortDirection.DESC,
                    sortedList: this.state.sortDirection ===
                    SortDirection.DESC ? nextSort : nextSort.reverse()
                  });
    // Deselect the selected row or move the index
    this.props.sortedIncomes();
  }

  render () {
    const { columns } = this.props.income;
    const { selectedRow } = this.props.income;
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

export default connect(mapStateToProps, { getIncomes, selectIncome, sortedIncomes })(IncomeTable);
