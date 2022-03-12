// Import Basics
import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Import dispatch actions
import { deleteExpense, clearExpenseError } from '../../../../../actions/expenseActions.js';
// Import functions
import { formatDateMMDD } from '../../../../../functions/dates.js';
// Import components
import Spinner from '../../../../misc/spinner.js';
import Button  from '../../../../input/button.js';
import Message from '../../../../misc/message.js';

const ExpenseDelete = () => {
  const { selected, loading, error } = useSelector(state => state.expense);

  // Send the delete request or go back to the previous screen
  const dispatch = useDispatch();
  const onDelete = () => { dispatch(deleteExpense(selected._id)) };

  // Clear errors
  const timer = useRef(null);
  useEffect(() => {
    if (!timer.current) {
      timer.current = setTimeout(() => {
        dispatch(clearExpenseError());
        timer.current = null;
      }, [5000]);
    }
  }, [dispatch, error]);

  return (
    <div className="">
      { loading ? <Spinner extraClasses="mt-4"/> :
        <div className="flex flex-col mt-8">
          <h3 className="text-white font-semibold text-center mb-8 ">
            Delete expense from {formatDateMMDD(selected.date)}?</h3>
          <div className="w-full flex flex-row justify-center">
            <Button label="Delete It"
              color="green"
              title="Delete Selected Expense"
              onClick={onDelete} />
          </div>
        </div>
      }
      {error && <Message error={error} />}
    </div>
  )
}

export default ExpenseDelete;
