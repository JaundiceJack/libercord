// Import basics
import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
// Import router stuff
import { Redirect } from 'react-router-dom';
// Import server actions
import { loadUser }       from '../../actions/authActions';
import { getIncomes }     from '../../actions/incomeActions';
import { getExpenses }    from '../../actions/expenseActions';
import { getAssets }      from '../../actions/assetActions';
import { getLiabilities } from '../../actions/liabilityActions';
// Import the section selection
import ManageNav        from './manageNav';
// Import the summary page
import Summary          from './summary/summary';
// Import options
import AssetOptions     from './assets/assetOptions';
import IncomeOptions    from './income/incomeOptions';
import ExpenseOptions   from './expenses/expenseOptions';
import LiabilityOptions from './liabilities/liabilityOptions';
// Import tables
import AssetTable       from './assets/assetTable';
import IncomeTable      from './income/incomeTable';
import ExpenseTable     from './expenses/expenseTable';
import LiabilityTable   from './liabilities/liabilityTable';

const Manage = () => {
  // Check for user authentication each 1000ms
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const updateTimer = useRef(null);
  const dispatch = useDispatch();
  const setUpdate = () => {
    dispatch(loadUser());
    dispatch(getIncomes());
    dispatch(getExpenses());
    dispatch(getAssets());
    dispatch(getLiabilities());
    updateTimer.current = setTimeout(() => { updateTimer.current = null }, 1000);
  }
  useEffect(() => {
    !updateTimer.current && setUpdate() }, [isAuthenticated, dispatch]);
  useEffect(() => { return () => {
    updateTimer.current && clearTimeout(updateTimer.current) } }, []);

  // Set an internal state to toggle between sections
  const [section, setSection] = useState('summary');

  // Switch to the clicked section (summary/expenses/income/assets/liabilities)
  const changeSection = nextSection => { setSection(nextSection) };

  return (
    <div>
      {isAuthenticated ?
        <section className="pt-2 flex flex-col mb-6">
          <ManageNav currentSection={section}
                     changeSection={changeSection} />
          {section === 'summary' &&
            <div className="flex flex-col sm:flex-row items-start mt-6 sm:px-6">
              <Summary />
            </div>
          }
          {section === 'expenses' &&
            <div className="grid grid-cols-5 gap-4 mt-6 sm:px-6">
              <ExpenseOptions />
              <ExpenseTable />
            </div>
          }
          {section === 'income' &&
            <div className="grid grid-cols-5 gap-4 mt-6 sm:px-6">
              <IncomeOptions />
              <IncomeTable />
            </div>
          }
          {section === 'assets' &&
            <div className="flex flex-col sm:flex-row items-start mt-6 sm:px-6">
              <AssetOptions />
              <AssetTable />
            </div>
          }
          {section === 'liabilities' &&
            <div className="flex flex-col sm:flex-row items-start mt-6 sm:px-6">
              <LiabilityOptions />
              <LiabilityTable />
            </div>
          }
          {/* Redirect to the homepage if the user is no longer authenticated */}
        </section> :
        <Redirect to="/" />
      }
    </div>
  );
};

// Set prop types and export
Manage.propTypes = {
  isAuthenticated: PropTypes.bool
}
export default Manage;
