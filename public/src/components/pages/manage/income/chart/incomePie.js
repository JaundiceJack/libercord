import { useState } from 'react';
import { useSelector } from 'react-redux';
import { capitalize } from '../../../../../functions/strings.js';
import PieChart from '../../../../misc/pieChart.js';
import BrowseButton from '../../../../input/browseButton.js';
import { add, sub, isSameMonth, getMonth } from 'date-fns'

const IncomePie = () => {
  const [date, setDate] = useState(new Date());
  const nextMonth = () => { setDate(add(date, { months: 1 })) };
  const backMonth = () => { setDate(sub(date, { months: 1 })) };
  const { incomes } = useSelector(state => state.income);

  // Sum up the incomes from matching sources
  let sources = {}
  const incomesThisMonth = incomes.filter(inc =>
    isSameMonth(new Date(inc.date), date));
  incomesThisMonth.forEach((inc, i) => {
    sources[inc.source] = (sources[inc.source] || 0) + inc.value });
  // Convert the sources/totals into a recharts-readable data array
  let data = [];
  for (let [key, value] of Object.entries(sources)) {
    data.push({ name: capitalize(key), value: value, source: capitalize(key) });
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
          <PieChart data={data} label="source" total={
            data.reduce((a, b) => {return a += b.value}, 0)
          } /> :
        <p className="text-blue-100 text-center font-semibold font-jose my-auto">
          No income for this month yet.</p> }
      </div>

    </div>
  )
}

export default IncomePie;
