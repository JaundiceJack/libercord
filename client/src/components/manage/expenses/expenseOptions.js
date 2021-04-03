// Import basic react stuff
import React, { Component } from 'react';
// Import state stuff
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// Import server actions
import { getExpenses } from '../../../actions/expenseActions';
// Import components
import AddExpense from './addExpense';
// Import style presets
import { buttonClasses, summaryClasses, tableFormContainerClasses } from '../../tailwinds';

// Map the redux state to the component properties
const mapStateToProps = (state) => ({
  expense: state.expense
})

class ExpenseOptions extends Component {
  // Check for expense retrieval
  componentDidMount(){ this.props.getExpenses();  };
  // Set a state to toggle expense addition
  state = { adding: false }
  // Define prop types
  static propTypes = {
    getExpenses: PropTypes.func.isRequired,
    expense: PropTypes.object.isRequired
  }
  // When add expense is clicked, set the state to adding
  onAdd = () => this.setState({adding: !this.state.adding});

  render() {
    const { expenses } = this.props.expense;
    return (
      <div className={tableFormContainerClasses}>
        <div className={summaryClasses}>
          <p>Total Value:</p>
          {/* Get the total expense value in dollars.cents format */}
          <p className="text-green-300">
            ${Intl.NumberFormat()
              .format(expenses.reduce((total, expense) =>
                expense.value + total, 0).toFixed(2))
            }
          </p>
        </div>
        <div className="flex flex-col mt-2 sm:mt-6 p-2">
          <button onClick={this.onAdd}
                  className={this.state.adding ?
                    buttonClasses+" border-red-500 text-red-500 mb-8" :
                    buttonClasses+" border-green-500 text-blue-100 "}>
                  {this.state.adding ? "Cancel" : "New Expense"}
          </button>
          {this.state.adding && <AddExpense toggleAdd={this.onAdd}/>}
        </div>
      </div>
    );
  }
};

export default connect(mapStateToProps, { getExpenses })(ExpenseOptions);
