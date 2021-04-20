// Import basics
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
// Import style presets
import { buttonClasses } from '../../tailwinds';
// Import server actions
import { deleteIncome }  from '../../../actions/incomeActions';

const DeleteIncome = ({toggleDelete}) => {
  // Make a dispatch to access the redux actions
  const dispatch = useDispatch();
  // Get the selected item's ID from the store
  const selectedId = useSelector(state => state.income.selectedIncome._id)
  // Delete the item once confirmed
  const onDelete = (e) => {
    e.preventDefault();
    dispatch(deleteIncome(selectedId));
    // Hide the form on submission
    toggleDelete();
  };

  return (
    <button type="button"
            onClick={onDelete}
            className={buttonClasses+"mt-6 border-red-500 text-red-100"}>
      Delete Income
    </button>
  );

};

DeleteIncome.propTypes = {
  deleteIncome: PropTypes.func,
  selectedId:   PropTypes.string,
  toggleDelete: PropTypes.func
}
export default DeleteIncome;
