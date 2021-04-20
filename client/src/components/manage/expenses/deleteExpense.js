// Import basics
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
// Import style presets
import { buttonClasses } from '../../tailwinds';
// Import server actions
import { deleteExpense } from '../../../actions/expenseActions';

const DeleteExpense = ({toggleDelete}) => {
  // Make a dispatch to access the redux actions
  const dispatch = useDispatch();
  // Get the selected item's ID from the store
  const selectedId = useSelector(state => state.expense.selectedExpense._id)
  // Delete the item once confirmed
  const onDelete = (e) => {
    e.preventDefault();
    dispatch(deleteExpense(selectedId));
    // Hide the form on submission
    toggleDelete();
  };

  return (
    <button type="button"
            onClick={onDelete}
            className={buttonClasses+"mt-6 border-red-500 text-red-100"}>
      Delete Expense
    </button>
  );

};

DeleteExpense.propTypes = {
  deleteExpense: PropTypes.func,
  selectedId:   PropTypes.string,
  toggleDelete: PropTypes.func
}
export default DeleteExpense;
