// Import ez-mode
import { isSameYear, isSameMonth } from 'date-fns';

//
const months = [
  'January', 'February', 'March',     'April',   'May',      'June',
  'July',    'August',   'September', 'October', 'November', 'December'
];

// Obtain a total for the year's transactions, Return a Number
export const yearlyTotal = (transactions, year) => {
  return transactions
    .filter(elem => filterByYear(year, elem))
    .reduce(totalValue, 0);
}

export const yearlySavings = (incomes, expenses, year) => {
  const yearlyIncome = yearlyTotal(incomes, year);
  const yearlyExpenses = yearlyTotal(expenses, year);
  return yearlyIncome - yearlyExpenses;
}

export const totalSavings = (incomes, expenses) => {
  const totalIncome = incomes.reduce(totalValue, 0);
  const totalExpenses = expenses.reduce(totalValue, 0);
  return totalIncome - totalExpenses;
}

// Obtain the totals for each month's transactions, Return an array of objects
export const monthlyTotals = (type, transactions, year) => {
  return months.map((month, index) => {
    const date = new Date(year, index);
    return {
      name: month,
      [type]: transactions
        .filter(elem => filterByMonth(date, elem))
        .reduce(totalValue, 0)
    }
  })
}
// Return true if the element date is in the same month/year as the provided date
const filterByMonth = (date, elem) => {
  const tranDate = new Date(elem.date);
  return isSameMonth(tranDate, date) && isSameYear(tranDate, date);
}
const filterByYear = (year, elem) => {
  const tranDate = new Date(elem.date);
  return tranDate.getFullYear() === year;
}
// Return the sum of the transaction's value and the total
const totalValue = (total, elem) => { return total + elem.value; }
