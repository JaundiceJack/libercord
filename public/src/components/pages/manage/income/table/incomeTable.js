// Import basics
import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Import dispatch actions
import { selectIncome, clearIncomeError }
  from '../../../../../actions/incomeActions.js';
// Import components
import ScrollWindow from '../../../../misc/scrollWindow.js';
import Spinner from '../../../../misc/spinner.js';
import Message from '../../../../misc/message.js';
import Header        from '../../../../misc/header.js';
// Import icons
import { VscDiffAdded } from 'react-icons/vsc';
import { GiReceiveMoney } from 'react-icons/gi';

const IncomeTable = ({ year }) => {
  const { incomes, selected, loading, error } = useSelector(state => state.income);

  // Clear errors
  const timer = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!timer.current) {
      timer.current = setTimeout(() => {
        dispatch(clearIncomeError());
        timer.current = null;
      }, [5000]);
    }
  }, [dispatch]);

  return (
    <div className="rounded-md flex w-full h-full items-center justify-center">
      {
        loading ? <Spinner /> :
        error ? <Message error={error} /> :
        incomes.length === 0 ?
        <div className="h-full w-full flex flex-col items-center justify-center">
          <p className="text-blue-100 text-center font-semibold font-jose my-auto">
            No income yet.<br />
            Click the <VscDiffAdded className="inline"/> below to begin.
          </p>
        </div> :

        <div className="flex flex-col w-full h-full sm:p-2">
          <div className={"bg-gray-400 rounded-t-md border-b border-gray-800 bg-header shadow-xl " +
            "grid grid-cols-12 w-full py-1 px-2 items-center"}>
            <p className="col-span-2 text-blue-100 font-semibold">Date</p>
            <p className="col-span-6 text-blue-100 font-semibold">Source</p>
            <p className="col-span-4 text-blue-100 font-semibold ml-4">Amount</p>
          </div>

          <div className="h-full">
            <ScrollWindow selected={selected}
              items={
                incomes.filter(inc => new Date(inc.date).getFullYear() === year )
                .sort((a, b) => new Date(a.date) - new Date(b.date) )}
              onSelect={selectIncome} />
          </div>
        </div>
      }
    </div>
  )
}

export default IncomeTable;
