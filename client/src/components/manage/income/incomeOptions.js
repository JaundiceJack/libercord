// Import basic react stuff
import React, { Component } from 'react';
// Import state stuff
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// Import server actions
import { getIncomes } from '../../../actions/incomeActions';
// Import components
import AddIncome from './addIncome';
// Import style presets
import { buttonClasses, summaryClasses, tableFormContainerClasses } from '../../tailwinds';

// Map the redux state to the component properties
const mapStateToProps = (state) => ({
  income: state.income
})

class IncomeOptions extends Component {
  // Check for income retrieval
  componentDidMount(){ this.props.getIncomes();  };
  // Set a state to toggle income addition
  state = { adding: false }
  // Define prop types
  static propTypes = {
    getIncomes: PropTypes.func.isRequired,
    income: PropTypes.object.isRequired
  }
  // When add income is clicked, set the state to adding
  onAdd = () => this.setState({adding: !this.state.adding});

  render() {
    const { incomes } = this.props.income;
    return (
      <div className={tableFormContainerClasses}>
        <div className={summaryClasses}>
          <p>Total Value:</p>
          {/* Get the total income value in dollars.cents format */}
          <p className="text-green-300">
            ${Intl.NumberFormat()
              .format(incomes.reduce((total, income) =>
                income.value + total, 0).toFixed(2))
            }
          </p>
        </div>
        <div className="flex flex-col mt-2 sm:mt-6 p-2">
          <button onClick={this.onAdd}
                  className={this.state.adding ?
                    buttonClasses+" border-red-500 text-red-500 mb-8" :
                    buttonClasses+" border-green-500 text-blue-100 "}>
                  {this.state.adding ? "Cancel" : "New Income"}
          </button>
          {this.state.adding && <AddIncome toggleAdd={this.onAdd}/>}
        </div>
      </div>
    );
  }
};

export default connect(mapStateToProps, { getIncomes })(IncomeOptions);
