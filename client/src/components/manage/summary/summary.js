// Import basic react stuff
import React, { Component } from 'react';
// Import state stuff
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// Import server actions
import { getIncomes } from '../../../actions/incomeActions';
import { getExpenses } from '../../../actions/expenseActions';
import { getAssets } from '../../../actions/assetActions';
import { getLiabilities } from '../../../actions/liabilityActions';
// Import components
import SummaryCard from './summaryCard';
import ExpenseCard from '../expenses/expenseCard';

function getTotal(items) {
  return Intl.NumberFormat().format(
         items.reduce((total, item) =>
         item.value + total, 0).toFixed(2));
}

// Map the redux state to the component properties
const mapStateToProps = (state) => ({
  liability: state.liability,
  asset:     state.asset,
  income:    state.income,
  expense:   state.expense
})

class Summary extends Component {
  // Check for liability retrieval
  componentDidMount(){
    this.props.getLiabilities();
    this.props.getAssets();
    this.props.getExpenses();
    this.props.getIncomes();
  };
  // Make a state to hold show/hide mechanisms
  state = { };
  // Define prop types
  static propTypes = {
    getLiabilities: PropTypes.func,
    getAssets: PropTypes.func,
    getIncomes: PropTypes.func,
    getExpenses: PropTypes.func,
    liability: PropTypes.object.isRequired,
    asset: PropTypes.object.isRequired,
    income: PropTypes.object.isRequired,
    expense: PropTypes.object.isRequired
  }

  render() {
    const { assets } = this.props.asset;
    const { liabilities } = this.props.liability;
    const { expenses } = this.props.expense;
    const { incomes } = this.props.income;
    return (
      <div className="grid grid-cols-2 gap-4 p-6 w-full bg-gradient-to-br from-black via-gray-900 to-gray-800 rounded-md ">
        <ExpenseCard header="Expenses Total"
                  text={"$"+ getTotal(expenses)} />
        <SummaryCard header={"Income Total"}
                  text={"$"+ getTotal(incomes)} />

      </div>
    )
  }
};

//<SummaryCard header="Assets Total"
//          text={"$"+ getTotal(assets)} />

//<SummaryCard header="Liabilities Total"
//          text={"$"+ getTotal(liabilities)} />

export default connect(mapStateToProps, {
  getIncomes,
  getExpenses,
  getAssets,
  getLiabilities,
})(Summary);
