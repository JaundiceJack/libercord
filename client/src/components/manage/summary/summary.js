// Import basics
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
// Import components
import SummaryCard from './summaryCard';
import IncomeCard  from '../income/incomeCard';
import ExpenseCard from '../expenses/expenseCard';

const Summary = () => {
  // Get the item lists from the store
  const expenses    = useSelector( state => state.expense.expenses );
  const incomes     = useSelector( state => state.income.incomes );
  const assets      = useSelector( state => state.asset.assets );
  const liabilities = useSelector( state => state.liability.liabilities );

  const summaryClasses = "grid grid-cols-2 gap-4 p-6 w-full rounded-md " +
  "bg-gradient-to-br from-black via-gray-900 to-gray-800 "

  return (
    <div className={summaryClasses}>
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
