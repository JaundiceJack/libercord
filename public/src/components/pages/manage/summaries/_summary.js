// Import basics
import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Import dispatch actions
import { loadUser }       from '../../../../actions/userActions.js';
import { getIncomes }     from '../../../../actions/incomeActions.js';
import { getExpenses }    from '../../../../actions/expenseActions.js';
import { getAssets }      from '../../../../actions/assetActions.js';
import { getLiabilities } from '../../../../actions/liabilityActions.js';

// Import icons
import { IoWalletOutline } from 'react-icons/io5';
// Import components
import Header from '../../../misc/header.js';
import SavingsChart from './savings/chart/savingsChart.js';
import SavingsInfo  from './savings/info/savingsInfo.js';


//import SummaryCard from './summaryCard';
//import SavingsCard from './savingsCard';
//import IncomeCard  from './incomeCard';
//import ExpenseCard from './expenseCard';

const Summary = ({ history }) => {
  // Get state variables from redux
  const { user, loading, error } = useSelector(state => state.user);
  const { expenses } = useSelector(state => state.expense);
  const { incomes } = useSelector(state => state.income);

  // Set a year to filter expenses
  const [year, setYear] = useState(new Date().getFullYear());
  const backYear = () => { setYear(year - 1) };
  const nextYear = () => { setYear(year + 1) };

  // Check for the user and load them in if absent
  const dispatch = useDispatch();
  const timer = useRef(null);
  useEffect(() => {
    if (!timer.current) {
      if (expenses.length === 0) dispatch(getExpenses());
      if (incomes.length === 0) dispatch(getIncomes());
      if (!user.token) history.push('/login?redirect=summary');
      timer.current = setTimeout(() => { timer.current = null; }, 5000);
    }
  }, [dispatch, user, expenses, incomes]);

  return (
    <div className={"flex flex-col mx-0 mt-4 sm:m-4 h-full "}>
      <Header text="Financial Summary" icon={<IoWalletOutline />} />
      <div className={"grid grid-cols-1 lg:grid-cols-2 lg:grid-cols-3 gap-4 " +
        "min-h-screen p-4"}>

        <div className={"flex flex-col justify-center bg-content bg-shadow " +
          "h-120 rounded-lg p-4"}>
          <SavingsInfo year={year} onPrev={backYear} onNext={nextYear}  />
        </div>

        <div className="lg:col-span-2 bg-content bg-shadow rounded-lg h-120 p-4">
          <SavingsChart year={year} onPrev={backYear} onNext={nextYear} />
        </div>
      </div>
    </div>
  )
};

export default Summary;
