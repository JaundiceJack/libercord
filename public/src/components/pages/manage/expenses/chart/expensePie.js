import { useState }    from 'react';
import { useSelector } from 'react-redux';
import { capitalize }  from '../../../../../functions/strings.js';
import PieChart        from '../../../../misc/pieChart.js';
import BrowseButton    from '../../../../input/browseButton.js';
import { add, sub, isSameMonth, getMonth } from 'date-fns'

const ExpensePie = () => {
  const [date, setDate] = useState(new Date());
  const nextMonth = () => { setDate(add(date, { months: 1 })) };
  const backMonth = () => { setDate(sub(date, { months: 1 })) };
  const { expenses } = useSelector(state => state.expense);

  // Sum up the expenses from matching locations
  let locations = {}
  const expensesThisMonth = expenses.filter(exp =>
    isSameMonth(new Date(exp.date), date));
  expensesThisMonth.forEach((exp, i) => {
    locations[exp.location] = (locations[exp.location] || 0) + exp.value });

  // Convert the locations/totals into a recharts-readable data array
  let data = [];
  for (let [key, value] of Object.entries(locations)) {
    data.push({ name: capitalize(key), value: value, location: capitalize(key) });
  }

  const months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  return (
    <div className="w-full h-full rounded-md flex flex-col">
      <div className="flex justify-center p-2 items-center" >
        <BrowseButton direction="back" onClick={backMonth} />
        <h4 className="text-blue-200 text-md font-semibold">
          {months[getMonth(date)]} {date.getFullYear()}
        </h4>
        <BrowseButton direction="next" onClick={nextMonth} />
      </div>

      <div className="self-center my-auto ">
        {data.length > 0 ?
          <PieChart data={data} label={"location"} total={
            data.reduce((a, b) => {return a += b.value}, 0)
          } /> :
        <p className="text-blue-100 text-center font-semibold font-jose my-auto">
          No expenses for this month yet.</p> }
      </div>

    </div>
  )
}

export default ExpensePie;
