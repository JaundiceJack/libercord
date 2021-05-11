// Import basics
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
// Import Icons
import { IoChevronBackCircle, IoChevronForwardCircle } from "react-icons/io5";
// Import date functions to parse data
import { isSameMonth, isSameYear } from 'date-fns';
// Import components
import MonthTotal        from './monthTotal';
import YearTotal         from './yearTotal';
import CobblerChart      from './pieChart';
// Import style presets
import { cardContainerClasses,
         headerTextClasses,
         hrLeftClasses } from '../../tailwinds';
// Import server actions
import { getIncomes }   from '../../../actions/incomeActions';

const IncomeCard = () => {
  // Retrieve the user's list of incomes from the server
  const incomes = useSelector( state => state.income.incomes );
  const categories = useSelector( state => state.income.categories );
  const loading = useSelector( state => state.income.loading );

  // TODO: I guess if the user incremented or decremented to exceed int or double vals, they could break it
  // Create a component state to store the displayed year
  const [year, setYear]         = useState(2021);
  const [selected, setSelected] = useState("year");
  const incrementYear = () => { setYear(year + 1) };
  const decrementYear = () => { setYear(year - 1) };

  // Get the total incomes for each month or year when they load
  const totalByTime = (month, compareFunction) => {
    if (!loading) {
      const expIn = byTime(month, compareFunction);
      const total = expIn
            .reduce((total, datum) => datum.value + total, 0)
            .toFixed(2);
      return Intl.NumberFormat().format(total);
    }
  }

  // Get a list of incomes' values and dates that occured in the given month or year
  const byTime = (month, compareFunction) => {
    const formatted = incomes.map((item) =>
      { return { date: new Date(item.date),
                 value: item.value,
                 category: item.category };
      }
    );
    const compareDate = new Date(year, month);
    return formatted.filter((item) =>
      { return compareFunction(compareDate, item.date); });
  }

  // Produce a list of totals for each category
  const totalsByCategory = () => {
    if (!loading) {
      return categories.map((cat) => {
        const mths = ['jan',  'feb', 'mar',  'apr', 'may', 'june',
                      'july', 'aug', 'sept', 'oct', 'nov', 'dec'];
        const selectedTime = selected === "year" ?
                             byTime(0, isSameYear) :
                             byTime(mths.indexOf(selected), isSameMonth);
        return {
          category: cat,
          value: selectedTime.reduce((total, inc) => {
            return total + (inc.category === cat ? inc.value : 0);
          }, 0)
        }
      }).filter((cat) => {
        // Filter out empty categories
        return cat.value !== 0;
      });
    };
  };

  return (
    <div className={cardContainerClasses+"col-start-1 sm:col-start-2 col-end-4"}>
      <div className="flex flex-row px-2 pt-2 pb-1 items-end justify-center sm:justify-start">
        <button onClick={decrementYear} className="text-green-300 mx-2" >
          <IoChevronBackCircle size="30px" />
        </button>
        <h2 className="font-jose text-xl text-green-300">{year} Incomes</h2>
        <button onClick={incrementYear} className="text-green-300 ml-2">
          <IoChevronForwardCircle size="30px" />
        </button>
      </div>
      <div className="h-px w-full bg-gradient-to-r from-green-600 to-transparent "></div>
      <div className="p-4 flex flex-col sm:flex-row">
        <div className="flex flex-col sm:w-48">

          <MonthTotal month="Jan"
                      total={totalByTime(0, isSameMonth) || "0"}
                      onClick={() => { setSelected("jan"); }}
                      isActive={selected === "jan"} />

          <MonthTotal month="Feb"
                      total={totalByTime(1, isSameMonth) || "0"}
                      onClick={() => { setSelected("feb"); }}
                      isActive={selected === "feb"} />

          <MonthTotal month="Mar"
                      total={totalByTime(2, isSameMonth) || "0"}
                      onClick={() => { setSelected("mar"); }}
                      isActive={selected === "mar"} />

          <MonthTotal month="Apr"
                      total={totalByTime(3, isSameMonth) || "0"}
                      onClick={() => { setSelected("apr"); }}
                      isActive={selected === "apr"} />

          <MonthTotal month="May"
                      total={totalByTime(4, isSameMonth) || "0"}
                      onClick={() => { setSelected("may"); }}
                      isActive={selected === "may"} />

          <MonthTotal month="June"
                      total={totalByTime(5, isSameMonth) || "0"}
                      onClick={() => { setSelected("june"); }}
                      isActive={selected === "june"} />

          <MonthTotal month="July"
                      total={totalByTime(6, isSameMonth) || "0"}
                      onClick={() => { setSelected("july"); }}
                      isActive={selected === "july"} />

          <MonthTotal month="Aug"
                      total={totalByTime(7, isSameMonth) || "0"}
                      onClick={() => { setSelected("aug"); }}
                      isActive={selected === "aug"} />

          <MonthTotal month="Sept"
                      total={totalByTime(8, isSameMonth) || "0"}
                      onClick={() => { setSelected("sept"); }}
                      isActive={selected === "sept"} />

          <MonthTotal month="Oct"
                      total={totalByTime(9, isSameMonth) || "0"}
                      onClick={() => { setSelected("oct"); }}
                      isActive={selected === "oct"} />

          <MonthTotal month="Nov"
                      total={totalByTime(10, isSameMonth) || "0"}
                      onClick={() => { setSelected("nov"); }}
                      isActive={selected === "nov"} />

          <MonthTotal month="Dec"
                      total={totalByTime(11, isSameMonth) || "0"}
                      onClick={() => { setSelected("dec"); }}
                      isActive={selected === "dec"} />

          <YearTotal  total={totalByTime(0, isSameYear) || "0"}
                      onClick={() => { setSelected("year"); }}
                      isActive={selected === "year"} />
        </div>

        {/* Show incomes by category for the selected time in a pie chart */}
        <div className="w-full">
          <h2 className="mt-6 sm:mt-2 font-jose text-xl font-bold text-center text-blue-200">
          Income Breakdown:</h2>
          <CobblerChart data={totalsByCategory() || [{value: 0}]} />
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
