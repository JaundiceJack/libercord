// Import basics
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
// Import the table preset
import TableA from '../tableTypeA';
// Import server actions
import { getExpenses, selectExpense, sortedExpenses }
              from '../../../actions/expenseActions';

const ExpenseTable = () => {
  // Make a dispatcher to access income actions
  const dispatch = useDispatch();
  // Retrieve the user's list of expenses from the server
  const expense = useSelector( state => state.expense );
  // Connect redux actions to a dispatch
  const select = ({ rowData, index }) => {
    dispatch(selectExpense(rowData, index)) };
  const sorted = ()  => {
    dispatch(sortedExpenses()) };

  return (
    <TableA
      data       ={expense.expenses}
      cols       ={expense.columns}
      selectedRow={expense.selectedRow}
      selectDatum={select}
      userSorted ={sorted}
    />
  )
};

// Define prop types
ExpenseTable.propTypes = {
  expense:        PropTypes.object,
  getExpenses:    PropTypes.func,
  selectExpense:  PropTypes.func,
  sortedExpenses: PropTypes.func
}
export default ExpenseTable;
