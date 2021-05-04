// Import basics
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
// Import components
import SummaryCard from './summaryCard';
import SavingsCard from './savingsCard';
import IncomeCard  from './incomeCard';
import ExpenseCard from './expenseCard';


// TODO: I'm passing some toggle functions in by reference,
// that creates a huge memory leak, so I need to pass them in as arrow functions
// like () => setValue(!value) instead of just toggleVal

// So for the charts, what exactly do i want?
// I'd like a chart next to the income and expenses at least,
// I'd like the months and year total to be clickable,
// and on click, show the distribution for that month via pie chart,
// for the savings summary though, I'd like a line chart,
// with three lines, income/expenses/total-savings


const Summary = () => {
  // Get the item lists from the store
  const expenses    = useSelector( state => state.expense.expenses );
  const incomes     = useSelector( state => state.income.incomes );
  const assets      = useSelector( state => state.asset.assets );
  const liabilities = useSelector( state => state.liability.liabilities );

  const summaryClasses = "grid grid-cols-3 gap-4 p-6 w-full rounded-md " +
  "bg-gradient-to-br from-black via-gray-900 to-gray-800 "

  return (
    <div className={summaryClasses}>
      <SummaryCard />
      <SavingsCard />
      <ExpenseCard />
      <IncomeCard  />

    </div>
  )
};

// Set prop types and export
Summary.propTypes = {
  liabilities: PropTypes.array,
  assets:      PropTypes.array,
  incomes:     PropTypes.array,
  expenses:    PropTypes.array
}
export default Summary;
