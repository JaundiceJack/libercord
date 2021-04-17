// Import basic react stuff
import React, { Component } from 'react';
// Import state stuff
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// Import server actions
import { getIncomes } from '../../../actions/incomeActions';
// Import Icons
import { IoChevronBackCircle, IoChevronForwardCircle } from "react-icons/io5";
// Import date functions to parse data
import { isSameMonth, isSameYear } from 'date-fns';
// Import components
import MonthTotal from '../summary/monthTotal';
// Import style presets
import { cardContainerClasses, headerTextClasses, hrLeftClasses } from '../../tailwinds';

// Map the redux state to the component properties
const mapStateToProps = (state) => ({
  income: state.income
})

class IncomeCard extends Component {
  // Check for income retrieval
  componentDidMount(){ this.props.getIncomes(); };
  // Define prop types
  static propTypes = {
    getIncomes: PropTypes.func.isRequired,
    income: PropTypes.object.isRequired
  }
  // Create a component state to store the displayed year
  state = {year: 2021}

  incrementYear = () => { this.setState({year: this.state.year + 1 })};
  decrementYear = () => { this.setState({year: this.state.year - 1 })};

  // Get the incomes total for each given month when they load
  monthlyTotal = (year, month) => {
    if (!this.props.income.loading) {
      const { incomes } = this.props.income
      const formatted = incomes.map((exp) =>
        { return {date: new Date(exp.date), value: exp.value}; });
      const compareDate = new Date(year, month);
      // Get the incomes that occured on the given month
      const expInMonth = formatted.filter((exp) =>
        { return isSameMonth(compareDate, exp.date); });
      const total = expInMonth
            .reduce((total, datum) => datum.value + total, 0)
            .toFixed(2);
      // Return the total in $0.00 format
      return "$" + Intl.NumberFormat().format(total);
    }
  }

  // Get the incomes total for the year once they load
  yearlyTotal = () => {
    if (!this.props.income.loading) {
      const { incomes } = this.props.income
      const formatted = incomes.map((exp) =>
        { return {date: new Date(exp.date), value: exp.value}; });
      const compareDate = new Date(this.state.year, 0);
      const expInMonth = formatted.filter((exp) =>
        { return isSameYear(compareDate, exp.date); });
      const total = expInMonth
            .reduce((total, datum) => datum.value + total, 0)
            .toFixed(2);
      return "$" + Intl.NumberFormat().format(total);
    }
  }


  render() {
    const { incomes } = this.props.income;
    return (
      <div className={cardContainerClasses+"col-span-2 sm:col-span-1"}>
        <div className="flex flex-row px-2 pt-2 pb-1 justify-center sm:justify-start">
          <button onClick={this.decrementYear} className="text-blue-300 mx-2" >
            <IoChevronBackCircle size="30px" /></button>
          <h2 className={headerTextClasses}>{this.state.year} Income</h2>
          <button onClick={this.incrementYear} className="text-blue-300 mr-2">
            <IoChevronForwardCircle size="30px" /></button>
        </div>
        <div className={hrLeftClasses}></div>
        <div className="rounded-b-md p-4">
          <div className="w-full sm:w-3/5">
            <MonthTotal month="January" total={this.monthlyTotal(this.state.year, 0)} />
            <MonthTotal month="February" total={this.monthlyTotal(this.state.year, 1)} />
            <MonthTotal month="March" total={this.monthlyTotal(this.state.year, 2)} />
            <MonthTotal month="April" total={this.monthlyTotal(this.state.year, 3)} />
            <MonthTotal month="May" total={this.monthlyTotal(this.state.year, 4)} />
            <MonthTotal month="June" total={this.monthlyTotal(this.state.year, 5)} />
            <MonthTotal month="July" total={this.monthlyTotal(this.state.year, 6)} />
            <MonthTotal month="August" total={this.monthlyTotal(this.state.year, 7)} />
            <MonthTotal month="September" total={this.monthlyTotal(this.state.year, 8)} />
            <MonthTotal month="October" total={this.monthlyTotal(this.state.year, 9)} />
            <MonthTotal month="November" total={this.monthlyTotal(this.state.year, 10)} />
            <MonthTotal month="December" total={this.monthlyTotal(this.state.year, 11)} />
            <div className="grid grid-cols-2 gap-3 mt-2">
              <p className="text-right text-blue-200 font-bold text-xl">
                {this.state.year} Income:</p>
              <p className="text-blue-200 font-bold text-xl">{this.yearlyTotal() || "$0.00"}</p>
            </div>
          </div>
          <div className="col-span-1">
          </div>
        </div>
      </div>
    );
  }
};

export default connect(mapStateToProps, { getIncomes })(IncomeCard);
