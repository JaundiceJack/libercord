// Import basics
import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Import dispatch actions
import { selectExpense, clearExpenseError } from '../../../../../actions/expenseActions.js';
// Import components
import ScrollWindow from '../../../../misc/scrollWindow.js';
import Spinner from '../../../../misc/spinner.js';
import Button from '../../../../input/button.js';
import BrowseButton from '../../../../input/browseButton.js';
import Message from '../../../../misc/message.js';
// Import icons
import { VscDiffAdded } from 'react-icons/vsc';

const ExpenseTable = () => {
  const { expenses, selected, loading, error } = useSelector(state => state.expense);

  // Set a year to filter expenses
  const [year, setYear] = useState(new Date().getFullYear());
  const backYear = () => { setYear(year - 1) };
  const nextYear = () => { setYear(year + 1) };

  // Clear errors
  const timer = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!timer.current) {
      timer.current = setTimeout(() => {
        dispatch(clearExpenseError());
        timer.current = null;
      }, [5000]);
    }
  }, [dispatch]);

  return (
    <div className="rounded-md flex w-full h-full items-center justify-center">
      {
        loading ? <Spinner /> :
        error ? <Message error={error} /> :
        expenses.length === 0 ?
        <div className="h-full w-full flex items-center justify-center">
          <p className="text-blue-100 text-center font-semibold font-jose my-auto">
            No expense yet.<br />
            Click the <VscDiffAdded className="inline"/> below to begin.
          </p>
        </div> :
        <div className="flex flex-col w-full h-full p-2">

          <div className="flex flex-row justify-center items-center mb-4">
            <BrowseButton direction="back" onClick={backYear} />
            <h4 className="text-blue-200 text-md font-semibold">
              {year}
            </h4>
            <BrowseButton direction="next" onClick={nextYear} />
          </div>

          <div className={"bg-gray-400 rounded-t-md border-b border-gray-800 bg-header shadow-xl " +
            "grid grid-cols-12 w-full py-1 px-2 items-center"}>
            <p className="col-span-2 text-blue-100 font-semibold">Date</p>
            <p className="col-span-6 text-blue-100 font-semibold">Location</p>
            <p className="col-span-4 text-blue-100 font-semibold ml-4">Amount</p>
          </div>

          <div className="h-full">
            <ScrollWindow selected={selected}
              items={
                expenses.filter(inc => new Date(inc.date).getFullYear() === year )
                .sort((a, b) => new Date(a.date) - new Date(b.date) )}
              onSelect={selectExpense} />
          </div>

        </div>
      }
    </div>
  )
}

export default ExpenseTable;
