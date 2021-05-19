// Import basics
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
// Import server actions
import { getIncomes } from '../../../actions/incomeActions';
// Import Icons
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
// Import date functions to parse data
import { isSameMonth, isSameYear, isBefore } from 'date-fns';
// Import components
import MonthTotal from './monthTotal';
import YearTotal from './yearTotal';
import SavingsChart from './lineChart';
// Import style presets
import { cardContainerClasses, headerTextClasses, hrLeftClasses } from '../../tailwinds';


const SavingsCard = () => {
  // Retrieve the user's finances from the store
  const incomes = useSelector( state => state.income.incomes );
  const expenses = useSelector( state => state.expense.expenses );
  const loading = useSelector( state => state.income.loading );
  const initial = useSelector( state => state.auth.user.startingBalance );

  // Create a component state to store the displayed year
  const [year, setYear]         = useState(2021);
  const [selected, setSelected] = useState("year");
  const [balance, setBalance]   = useState(4000);

  const incrementYear = () => { setYear(year + 1) };
  const decrementYear = () => { setYear(year - 1) };

  // Get the total savings for each given month when they load
  const monthlySavings = (month) => {
    if (!loading) {
      const incInMonth = incByTime(month, isSameMonth);
      const expInMonth = expByTime(month, isSameMonth);
      const totalIncome = incInMonth
            .reduce((total, datum) => datum.value + total, 0)
            .toFixed(2);
      const totalExpenses = expInMonth
            .reduce((total, datum) => datum.value + total, 0)
            .toFixed(2);
      // Return the total
      return (totalIncome - totalExpenses);
    }
  }

  // Get the incomes total for the year once they load
  const yearlySavings = () => {
    if (!loading) {
      const incInYear = incByTime(0, isSameYear);
      const expInYear = expByTime(0, isSameYear);
      const totalIncome = incInYear
            .reduce((total, datum) => datum.value + total, 0)
            .toFixed(2);
      const totalExpenses = expInYear
            .reduce((total, datum) => datum.value + total, 0)
            .toFixed(2);
      const yearTotal = totalIncome - totalExpenses
      return Intl.NumberFormat().format(yearTotal);
    }
  }

  // Get the total expenses for each month or year when they load
  const totalExpByTime = (month, compareFunction) => {
    if (!loading) {
      const expIn = expByTime(month, compareFunction);
      const total = expIn
            .reduce((total, datum) => datum.value + total, 0)
            .toFixed(2);
      return total;
    }
  }

  // Get the total incomes for each month or year when they load
  const totalIncByTime = (month, compareFunction) => {
    if (!loading) {
      const incIn = incByTime(month, compareFunction);
      const total = incIn
            .reduce((total, datum) => datum.value + total, 0)
            .toFixed(2);
      return total;
    }
  }

  // Get a list of expenses' values and dates that occured in the given month or year
  const expByTime = (month, compareFunction) => {
    const formatted = expenses.map((item) =>
      { return { date: new Date(item.date),
                 value: item.value,
                 category: item.category };
      }
    );
    const compareDate = new Date(year, month);
    return formatted.filter((item) =>
      { return compareFunction(compareDate, item.date); });
  }

  // Get a list of incomes' values and dates that occured in the given month or year
  const incByTime = (month, compareFunction) => {
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


  // Compose the data for the line graph
  // i need an array of 12 objects, one for each month, with the name of the month,
  // the value of the savings, the value of the income, and expeses
  const composeData = () => {
    const mths = ["Jan",  "Feb", "Mar",  "Apr", "May", "June",
                  "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    return mths.map((mnth) => {
      return {
        month: mnth,
        balance:  balanceByMonth(mths.indexOf(mnth)),
        expenses: totalExpByTime(mths.indexOf(mnth), isSameMonth),
        income:   totalIncByTime(mths.indexOf(mnth), isSameMonth)
      }
    });
  }

  // for the savings, i need a function that gets all the expenses and incomes before the given month and year,
  // totals those, then i add the difference to inital,
  //
  const balanceByMonth = month => {
    const compareDate = new Date(year, month);
    const incomesBefore = incomes.filter((income) => {
      const incDate = new Date(income.date);
      return isBefore(incDate, compareDate) || isSameMonth(incDate, compareDate);
    }).reduce((total, income) => income.value + total, 0);
    const expensesBefore = expenses.filter((expense) => {
      const expDate = new Date(expense.date);
      return isBefore(expDate, compareDate) || isSameMonth(expDate, compareDate);
    }).reduce((total, expense) => expense.value + total, 0);
    return initial + (incomesBefore - expensesBefore);
  }

  // So, i think i combined two separate concepts, savings per month,
  // and balance per month, in the current report, i'd like to do the balance
  // per month. to get that, there should be a starting balance,
  // and each month's savings total will make a monthly balance based on the previous
  //

  // refining the idea, if the user enters a starting balance when creating an account,
  // i can just calculate the balance at each point by adding/subtracting the savings,
  // for months without data, the savings would be 0 and the balance would remain unchanged,
  // for the years, the first year/month would show the entered starting balance,
  // and the savings per month would factor in for each month to december,
  // for the next year page, you would sum the savings for each month prior to that year,
  // and the starting balance would be the starting balance plus those savings

  // So, what if down the line, the user realizes their cash balance is off
  // and just wants to edit it up or down to match their bank?
  // would i just edit the starting balance by that much?
  // no, that would throw the other months off,
  // instead I should implement some sort of edit savings
  // or edit current cash balance,
  // so separate the concepts,
  // there's the starting balance, the current balance, and each intermediate balance,
  // so if they want to edit their balance, it would edit the current,
  // which would be the last datapoint. so, the intermediates are calculated,
  // maybe I should add an income for positive edits and an expense for negative edits,
  // with the category of adjustment, it would be added tothe current month and
  // then i could just continue calculating the current balance instead of storing it,
  // so, i should have a probably square box with a summary containg:
  // curent cash balance, net worth, payment reminders


  return (
    <div className={cardContainerClasses+"col-start-1 sm:col-start-2 col-end-4"}>
      <div className="flex flex-row px-2 pt-2 pb-1 items-end justify-center sm:justify-start">
        <button onClick={decrementYear} className="text-yellow-200 mx-2" >
          <HiChevronLeft size="30px" />
        </button>
        <h2 className="font-jose text-xl text-blue-100">{year} Savings</h2>
        <button onClick={incrementYear} className="text-yellow-200 ml-2">
          <HiChevronRight size="30px" />
        </button>
      </div>
      <div className={hrLeftClasses}></div>
      <div className="p-4 flex flex-col sm:flex-row">
        <div className="flex flex-col sm:w-48">
          <MonthTotal month="Jan"
                      total={monthlySavings(0) || "0"}
                      onClick={() => { setSelected("jan"); }}
                      isActive={selected === "jan"} />

          <MonthTotal month="Feb"
                      total={monthlySavings(1) || "0"}
                      onClick={() => { setSelected("feb"); }}
                      isActive={selected === "feb"} />

          <MonthTotal month="Mar"
                      total={monthlySavings(2) || "0"}
                      onClick={() => { setSelected("mar"); }}
                      isActive={selected === "mar"} />

          <MonthTotal month="Apr"
                      total={monthlySavings(3) || "0"}
                      onClick={() => { setSelected("apr"); }}
                      isActive={selected === "apr"} />

          <MonthTotal month="May"
                      total={monthlySavings(4) || "0"}
                      onClick={() => { setSelected("may"); }}
                      isActive={selected === "may"} />

          <MonthTotal month="June"
                      total={monthlySavings(5) || "0"}
                      onClick={() => { setSelected("june"); }}
                      isActive={selected === "june"} />

          <MonthTotal month="July"
                      total={monthlySavings(6) || "0"}
                      onClick={() => { setSelected("july"); }}
                      isActive={selected === "july"} />

          <MonthTotal month="Aug"
                      total={monthlySavings(7) || "0"}
                      onClick={() => { setSelected("aug"); }}
                      isActive={selected === "aug"} />

          <MonthTotal month="Sept"
                      total={monthlySavings(8) || "0"}
                      onClick={() => { setSelected("sept"); }}
                      isActive={selected === "sept"} />

          <MonthTotal month="Oct"
                      total={monthlySavings(9) || "0"}
                      onClick={() => { setSelected("oct"); }}
                      isActive={selected === "oct"} />

          <MonthTotal month="Nov"
                      total={monthlySavings(10) || "0"}
                      onClick={() => { setSelected("nov"); }}
                      isActive={selected === "nov"} />

          <MonthTotal month="Dec"
                      total={monthlySavings(11) || "0"}
                      onClick={() => { setSelected("dec"); }}
                      isActive={selected === "dec"} />

          <YearTotal  total={yearlySavings() || "0"}
                      onClick={() => { setSelected("year"); }}
                      isActive={selected === "year"} />
        </div>

        {/* Show expenses by category for the selected time in a pie chart */}
        <div className="w-full">
          <h2 className="mt-6 sm:mt-2 font-jose text-xl font-bold text-center text-blue-200">{year} Balance:</h2>
          <SavingsChart data={composeData()} />
        </div>
      </div>
    </div>
  );
};

SavingsCard.propTypes = {
  incomes: PropTypes.array,
  loading: PropTypes.bool
}
export default SavingsCard;
