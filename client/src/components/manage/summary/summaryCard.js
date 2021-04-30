// Import basics
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
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


const SummaryCard = () => {
  // Retrieve the user's finances from the store
  const incomes = useSelector( state => state.income.incomes );
  const expenses = useSelector( state => state.expense.expenses );
  const loading = useSelector( state => state.income.loading );

  // Create a component state to store the displayed year
  const [year, setYear] = useState(2021);
  const incrementYear = () => { setYear(year + 1) };
  const decrementYear = () => { setYear(year - 1) };

  // Get the total savings for each given month when they load
  const monthlySavings = (year, month) => {
    if (!loading) {
      const formattedIncomes = incomes.map((inc) =>
        { return {date: new Date(inc.date), value: inc.value}; });
      const formattedExpenses = expenses.map((exp) =>
        { return {date: new Date(exp.date), value: exp.value}; });
      const compareDate = new Date(year, month);

      const incInMonth = formattedIncomes.filter((inc) =>
        { return isSameMonth(compareDate, inc.date); });
      const expInMonth = formattedExpenses.filter((exp) =>
        { return isSameMonth(compareDate, exp.date); });
      const totalIncome = incInMonth
            .reduce((total, datum) => datum.value + total, 0)
            .toFixed(2);
      const totalExpenses = expInMonth
            .reduce((total, datum) => datum.value + total, 0)
            .toFixed(2);
      // Return the total in $0.00 format
      return "$" + Intl.NumberFormat().format(totalIncome - totalExpenses);
    }
  }

  // Get the incomes total for the year once they load
  const yearlySavings = () => {
    if (!loading) {
      const formattedIncomes = incomes.map((inc) =>
        { return {date: new Date(inc.date), value: inc.value}; });
      const formattedExpenses = expenses.map((exp) =>
        { return {date: new Date(exp.date), value: exp.value}; });
      const compareDate = new Date(year, 0);
      const incInYear = formattedIncomes.filter((inc) =>
        { return isSameYear(compareDate, inc.date); });
      const expInYear = formattedExpenses.filter((exp) =>
        { return isSameYear(compareDate, exp.date); });
      const totalIncome = incInYear
            .reduce((total, datum) => datum.value + total, 0)
            .toFixed(2);
      const totalExpenses = expInYear
            .reduce((total, datum) => datum.value + total, 0)
            .toFixed(2);
      const yearTotal = totalIncome - totalExpenses
      return "$" + Intl.NumberFormat().format(yearTotal);
    }
  }

  return (
    <div className={cardContainerClasses+"col-span-3 sm:col-span-1"}>
      <div className="flex flex-row px-2 pt-2 pb-1 justify-center sm:justify-start">
        <button onClick={decrementYear} className="text-blue-300 mx-2" >
          <IoChevronBackCircle size="30px" />
        </button>
        <h2 className={headerTextClasses}>{year} Savings</h2>
        <button onClick={incrementYear} className="text-blue-300 ml-2">
          <IoChevronForwardCircle size="30px" />
        </button>
      </div>
      <div className={hrLeftClasses}></div>
      <div className="rounded-b-md p-4">
        <div className="w-full sm:w-3/5">
          <MonthTotal month="January"   total={monthlySavings(year, 0)} />
          <MonthTotal month="February"  total={monthlySavings(year, 1)} />
          <MonthTotal month="March"     total={monthlySavings(year, 2)} />
          <MonthTotal month="April"     total={monthlySavings(year, 3)} />
          <MonthTotal month="May"       total={monthlySavings(year, 4)} />
          <MonthTotal month="June"      total={monthlySavings(year, 5)} />
          <MonthTotal month="July"      total={monthlySavings(year, 6)} />
          <MonthTotal month="August"    total={monthlySavings(year, 7)} />
          <MonthTotal month="September" total={monthlySavings(year, 8)} />
          <MonthTotal month="October"   total={monthlySavings(year, 9)} />
          <MonthTotal month="November"  total={monthlySavings(year, 10)} />
          <MonthTotal month="December"  total={monthlySavings(year, 11)} />
          <div className="grid grid-cols-2 gap-3 mt-2">
            <p className="text-right text-blue-200 font-bold text-xl">
              {year} Savings:</p>
            <p className="text-blue-200 font-bold text-xl self-end">{yearlySavings() || "$0.00"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

SummaryCard.propTypes = {
  incomes: PropTypes.array,
  loading: PropTypes.bool
}
export default SummaryCard;
