import ManageNav from './manageNav.js';
import AssetOptions from './assets/assetOptions.js';
import AssetTable from './assets/assetTable.js';
import ExpenseOptions from './expenses/expenseOptions.js';
import ExpenseTable from './expenses/expenseTable.js';
import IncomeOptions from './income/incomeOptions.js';
import IncomeTable from './income/incomeTable.js';
import LiabilityOptions from './liabilities/liabilityOptions.js';
import LiabilityTable from './liabilities/liabilityTable.js';
import { useState } from 'react';

const Manage = () => {
  // Temporarily use this to manage the state of the manage component
  const [ section, setSection ] = useState("assets");
  // Switch to the clicked section of manage (summary/expenses/income/assets/liabilities)
  const changeSection = nextSection => { setSection(nextSection); }

  return (
    <section className="pt-2 flex flex-col mb-6">
      <ManageNav currentSection={section} changeSection={changeSection} />
      {section === 'assets' &&
        <div className="flex flex-col sm:flex-row items-start mt-6 sm:px-6">
          <AssetOptions />
          <AssetTable />
        </div>
      }
      {section === 'expenses' &&
        <div className="flex flex-col sm:flex-row items-start mt-6 sm:px-6">
          <ExpenseOptions />
          <ExpenseTable />
        </div>
      }
      {section === 'income' &&
        <div className="flex flex-col sm:flex-row items-start mt-6 sm:px-6">
          <IncomeOptions />
          <IncomeTable />
        </div>
      }
      {section === 'liabilities' &&
        <div className="flex flex-col sm:flex-row items-start mt-6 sm:px-6">
          <LiabilityOptions />
          <LiabilityTable />
        </div>
      }
    </section>
  );
};

export default Manage;
