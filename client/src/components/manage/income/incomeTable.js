// Import basic react stuff
import React, { Component } from 'react';
// Import state stuff
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// Import server actions
import { getIncomes, deleteIncome } from '../../../actions/incomeActions';
// Import style presets
import { tableContainerClasses} from '../../tailwinds';
import DataTable from '../table';

// Define table columns
const columns = [
  { title: "Income", field: "category" },
  { title: "Paid",    field: "value" },
  { title: "Date",    field: "date" }
]

// Map the redux state to the component properties
const mapStateToProps = (state) => ({
  income: state.income
})

class IncomeTable extends Component {
  // Check for income retrieval
  componentDidMount(){ this.props.getIncomes(); };
  // Define prop types
  static propTypes = {
    getIncomes: PropTypes.func.isRequired,
    deleteIncome: PropTypes.func,
    income: PropTypes.object.isRequired
  }
  // Delete the selected income from the state/server
  onDelete = incomeID => { this.props.deleteIncome(incomeID); };

  render () {
    const { incomes } = this.props.income;
    return (
      <div className={tableContainerClasses}>
        <DataTable data={incomes} cols={columns}/>
      </div>
    )
  };
};

export default connect(mapStateToProps, { getIncomes, deleteIncome })(IncomeTable);
