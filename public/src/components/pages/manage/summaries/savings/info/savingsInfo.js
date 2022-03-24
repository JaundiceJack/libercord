// Import basics
import { useSelector, useDispatch } from 'react-redux';
// Import dispatch actions
import { toggleEditingBalance } from '../../../../../../actions/userActions.js';
// Import helper functions
import { yearlyTotal, yearlySavings, totalSavings } from '../../../../../../functions/arrays.js';
// Import Components
import Detail       from '../../../../../misc/detail.js';
import Button       from '../../../../../input/button.js';
import Header       from '../../../../../misc/header.js';
import EditBalance  from './editBalance.js';
// Import icons
import { IoWalletOutline } from 'react-icons/io5';
import { AiOutlineEdit } from 'react-icons/ai'

const SavingsInfo = ({ year }) => {
  const dispatch = useDispatch();
  const { editingBalance, user } = useSelector(state => state.user);
  const { incomes }              = useSelector(state => state.income);
  const { expenses }             = useSelector(state => state.expense);

  return (
    <div className={"h-full"}>
      {editingBalance ?
        <EditBalance toggle={() => dispatch(toggleEditingBalance())} /> :
        <div className="w-full h-full rounded-md flex flex-col">

          <div className={"flex flex-col h-full p-4"}>
            <div className="grid grid-cols-2 gap-2">
              <Detail label={`Income:`} color="bg-green-100" to="/income"
                data={`$${yearlyTotal(incomes, year).toFixed(2)}`} />
              <Detail label={`Expenses:`} color="bg-red-100" to="/expenses"
                data={`$${yearlyTotal(expenses, year).toFixed(2)}`} />
            </div>

            <Detail label={`${year} Savings:`} color="bg-yellow-50"
              data={`$${yearlySavings(incomes, expenses, year).toFixed(2)}`} />

            <div className="flex flex-row mt-auto items-center">
              <Detail label="Balance:"
                data={`$${((user.balance) + totalSavings(incomes, expenses)).toFixed(2)}`} />

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
