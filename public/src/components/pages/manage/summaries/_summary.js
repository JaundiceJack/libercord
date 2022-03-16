// Import basics
import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Import dispatch actions
import { loadUser }       from '../../../../actions/userActions.js';
import { getIncomes }     from '../../../../actions/incomeActions.js';
import { getExpenses }    from '../../../../actions/expenseActions.js';
//import { getAssets }      from '../../../../actions/assetActions.js';
//import { getLiabilities } from '../../../../actions/liabilityActions.js';
// Import components
import SavingsChart from './savings/chart/savingsChart.js';
import SavingsInfo  from './savings/info/savingsInfo.js';

const Summary = ({ history }) => {
  // Get state variables from redux
  const { user }     = useSelector(state => state.user);
  const { expenses } = useSelector(state => state.expense);
  const { incomes }  = useSelector(state => state.income);

  // Set a year to filter expenses
  const [year, setYear] = useState(new Date().getFullYear());
  const backYear = () => { setYear(year - 1) };
  const nextYear = () => { setYear(year + 1) };

  const dispatch = useDispatch();
  // Load the user's balance info
  useEffect(() => { dispatch(loadUser()); }, []);
  const timer = useRef(null);
  // Load the incomes/expenses
  useEffect(() => {
    if (!timer.current) {
      if (expenses.length === 0) dispatch(getExpenses());
      if (incomes.length === 0) dispatch(getIncomes());
      if (!user.token) history.push('/login?redirect=summary');
      timer.current = setTimeout(() => { timer.current = null; }, 5000);
    }
  }, [dispatch, user, expenses, incomes, history]);

  return (
    <div className={`flex flex-col mx-0 mt-4 sm:m-4 h-full `}>
      <div className={`grid grid-cols-1 lg:grid-cols-2 lg:grid-cols-3 gap-4
        min-h-screen p-4 sm:p-0`}>
        <div className={
          `flex flex-col justify-center bg-content bg-shadow rounded-lg p-4`}>
          <SavingsInfo year={year} onPrev={backYear} onNext={nextYear}  />
        </div>
        <div className="lg:col-span-2 bg-content bg-shadow rounded-lg p-4">
          <SavingsChart year={year} onPrev={backYear} onNext={nextYear} />
        </div>
      </div>
    </div>
  )
};

export default Summary;
