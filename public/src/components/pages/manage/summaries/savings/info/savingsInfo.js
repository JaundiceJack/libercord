// Import basics
import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Import dispatch actions
import { toggleEditingBalance } from '../../../../../../actions/userActions.js';
// Import helper functions
import { yearlyTotal, yearlySavings } from '../../../../../../functions/arrays.js';
// Import Components
import Detail from '../../../../../misc/detail.js';
import BrowseButton from '../../../../../input/browseButton.js';
import Button from '../../../../../input/button.js';
import EditBalance from './editBalance.js';
import { AiOutlineEdit } from 'react-icons/ai'

const SavingsInfo = ({ year, onPrev, onNext  }) => {
  const dispatch = useDispatch();
  const { editingBalance, user } = useSelector(state => state.user);
  const { incomes } = useSelector(state => state.income);
  const { expenses } = useSelector(state => state.expense);

  console.log(user);

  return (
    <div className={"h-full"}>
      {editingBalance ?
        <EditBalance toggle={() => dispatch(toggleEditingBalance())} /> :
        <div className="w-full h-full rounded-md flex flex-col">
          {/* Year Navigation */}
          <div className={"flex flex-row justify-center items-center mb-4 p-2"}>
            <BrowseButton direction="back" onClick={onPrev} />
            <h4 className={"text-blue-200 text-md font-semibold"}>
              {year}
            </h4>
            <BrowseButton direction="next" onClick={onNext} />
          </div>

          <div className={"flex flex-col rounded-lg container-bg-dark " +
            "h-full p-4"}>
            <div className="grid grid-cols-2 gap-2">
              <Detail label={`Income:`}
                data={`$${yearlyTotal(incomes, year).toFixed(2)}`} />
              <Detail label={`Expenses:`}
                data={`$${yearlyTotal(expenses, year).toFixed(2)}`} />
            </div>

            <Detail label={`${year} Savings:`}
              data={`$${yearlySavings(incomes, expenses, year).toFixed(2)}`} />

            <div className="flex flex-row mt-auto items-center">
              <Detail label="Balance:"
                data={`$${((user.balance || 0) + yearlySavings(incomes, expenses, year)).toFixed(2)}`} />

              <Button icon={<AiOutlineEdit />}
                onClick={() => dispatch(toggleEditingBalance())} />
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default SavingsInfo;
