import { useSelector } from 'react-redux';
import LineChart from '../../../../../misc/lineChart.js';
import BrowseButton from '../../../../../input/browseButton.js';
import { monthlyTotals } from '../../../../../../functions/arrays.js';

const SavingsChart = ({ year, onPrev, onNext }) => {
  // Pull variables from redux state
  const { incomes } = useSelector(state => state.income);
  const { expenses } = useSelector(state => state.expense);

  // Get the total transaction value for each month in the given year
  const incomeTotals  = monthlyTotals('Income',   incomes, year);
  const expenseTotals = monthlyTotals('Expenses', expenses, year);

  // Combine the totals and include savings data
  const data = [...Array(12).keys()].map(month => {
    return {
      ...incomeTotals[month],
      ...expenseTotals[month],
      Saved: incomeTotals[month].Income - expenseTotals[month].Expenses
    }
  });

  return (
    <div className={"w-full h-full rounded-md flex flex-col"}>
      {/* Year Navigation */}
      <div className={"flex flex-row justify-center items-center mb-4 p-2"}>
        <BrowseButton direction="back" onClick={onPrev} />
        <h4 className={"text-blue-200 text-md font-semibold"}>
          {year}
        </h4>
        <BrowseButton direction="next" onClick={onNext} />
      </div>
      {/* Savings Chart */}
      <div className={"flex flex-col h-full"}>
        <LineChart data={data} />
      </div>
    </div>
  )
}

export default SavingsChart;
