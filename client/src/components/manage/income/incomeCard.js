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


const IncomeCard = () => {
  // Retrieve the user's list of incomes from the server
  const incomes = useSelector( state => state.income.incomes );
  const loading = useSelector( state => state.income.loading );

  // Create a component state to store the displayed year
  const [year, setYear] = useState(2021);
  const incrementYear = () => { setYear(year + 1) };
  const decrementYear = () => { setYear(year - 1) };

  // Get the incomes total for each given month when they load
  const monthlyTotal = (year, month) => {
    if (!loading) {
      const formatted = incomes.map((inc) =>
        { return {date: new Date(inc.date), value: inc.value}; });
      const compareDate = new Date(year, month);
      // Get the incomes that occured on the given month
      const incInMonth = formatted.filter((inc) =>
        { return isSameMonth(compareDate, inc.date); });
      const total = incInMonth
            .reduce((total, datum) => datum.value + total, 0)
            .toFixed(2);
      // Return the total in $0.00 format
      return "$" + Intl.NumberFormat().format(total);
    }
  }

  // Get the incomes total for the year once they load
  const yearlyTotal = () => {
    if (!loading) {
      const formatted = incomes.map((inc) =>
        { return {date: new Date(inc.date), value: inc.value}; });
      const compareDate = new Date(year, 0);
      const incInMonth = formatted.filter((inc) =>
        { return isSameYear(compareDate, inc.date); });
      const total = incInMonth
            .reduce((total, datum) => datum.value + total, 0)
            .toFixed(2);
      return "$" + Intl.NumberFormat().format(total);
    }
  }

  return (
    <div className={cardContainerClasses+"col-span-2 sm:col-span-1"}>
      <div className="flex flex-row px-2 pt-2 pb-1 justify-center sm:justify-start">
        <button onClick={decrementYear} className="text-blue-300 mx-2" >
          <IoChevronBackCircle size="30px" />
        </button>
        <h2 className={headerTextClasses}>{year} Income</h2>
        <button onClick={incrementYear} className="text-blue-300 mr-2">
          <IoChevronForwardCircle size="30px" />
        </button>
      </div>
      <div className={hrLeftClasses}></div>
      <div className="rounded-b-md p-4">
        <div className="w-full sm:w-3/5">
          <MonthTotal month="January"   total={monthlyTotal(year, 0)} />
          <MonthTotal month="February"  total={monthlyTotal(year, 1)} />
          <MonthTotal month="March"     total={monthlyTotal(year, 2)} />
          <MonthTotal month="April"     total={monthlyTotal(year, 3)} />
          <MonthTotal month="May"       total={monthlyTotal(year, 4)} />
          <MonthTotal month="June"      total={monthlyTotal(year, 5)} />
          <MonthTotal month="July"      total={monthlyTotal(year, 6)} />
          <MonthTotal month="August"    total={monthlyTotal(year, 7)} />
          <MonthTotal month="September" total={monthlyTotal(year, 8)} />
          <MonthTotal month="October"   total={monthlyTotal(year, 9)} />
          <MonthTotal month="November"  total={monthlyTotal(year, 10)} />
          <MonthTotal month="December"  total={monthlyTotal(year, 11)} />
          <div className="grid grid-cols-2 gap-3 mt-2">
            <p className="text-right text-blue-200 font-bold text-xl">
              {year} Income:</p>
            <p className="text-blue-200 font-bold text-xl">{yearlyTotal() || "$0.00"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

IncomeCard.propTypes = {
  incomes: PropTypes.array,
  loading: PropTypes.bool
}
export default IncomeCard;
