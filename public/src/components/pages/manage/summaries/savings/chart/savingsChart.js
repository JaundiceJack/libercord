import { useSelector } from 'react-redux';
import LineChart from '../../../../../misc/lineChart.js';
import { monthlyTotals } from '../../../../../../functions/arrays.js';

const SavingsChart = ({ year }) => {
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
    <LineChart data={data} />
  )
}

export default SavingsChart;
