// Import Basics
import { useState }    from 'react';
import { useSelector } from 'react-redux';
// Import Components
import PieChart     from '../../../../misc/pieChart.js';
import BrowseButton from '../../../../input/browseButton.js';
import Button       from '../../../../input/button.js';
// Import functions
import { add, sub, isSameMonth, getMonth } from 'date-fns'
import { capitalize } from '../../../../../functions/strings.js';
// Import Icons
import { VscCircleFilled } from 'react-icons/vsc';

const IncomePie = () => {
  const [date, setDate] = useState(new Date());
  const nextMonth = () => { setDate(add(date, { months: 1 })) };
  const backMonth = () => { setDate(sub(date, { months: 1 })) };
  const { incomes } = useSelector(state => state.income);

  const [filterBy, setFilterBy] = useState('source');

  // Sum up the incomes from matching sources
  let sourceTotals = {};
  const sourcesThisMonth = incomes.filter(inc =>
    isSameMonth(new Date(inc.date), date));
  sourcesThisMonth.forEach((inc, i) => {
    if (inc.source && inc.source.name)
      sourceTotals[inc.source.name] =
        (sourceTotals[inc.source.name] || 0) + inc.value });
  // Convert the sources/totals into a recharts-readable data array
  let sourceData = [];
  for (let [key, value] of Object.entries(sourceTotals)) {
    sourceData.push({ name: capitalize(key), value: value, source: capitalize(key) });
  }

  // Sum up the incomes from matching categories
  let categoryTotals = {};
  const categoriesThisMonth = incomes.filter(inc =>
    isSameMonth(new Date(inc.date), date));
  categoriesThisMonth.forEach((inc, i) => {
    if (inc.category && inc.category.name)
      categoryTotals[inc.category.name] =
        (categoryTotals[inc.category.name] || 0) + inc.value });
  // Convert the categorys/totals into a recharts-readable data array
  let categoryData = [];
  for (let [key, value] of Object.entries(categoryTotals)) {
    categoryData.push({ name: capitalize(key), value: value, category: capitalize(key) });
  }

  const months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  return (
    <div className="flex flex-col h-full">
      <div className="w-full flex justify-center p-2 items-center" >
        <BrowseButton direction="back" onClick={backMonth} />
        <h4 className="text-blue-200 text-md font-semibold">
          {months[getMonth(date)]} {date.getFullYear()}
        </h4>
        <BrowseButton direction="next" onClick={nextMonth} />
      </div>

      {filterBy === 'source' ? (
        <div className="self-center mx-auto my-auto ">
          {sourceData.length > 0 ?
            <PieChart data={sourceData} label="source" total={
              sourceData.reduce((a, b) => {return a += b.value}, 0)
            } /> :
          <p className="text-blue-100 text-center font-semibold font-jose my-auto">
            No income for this month yet.</p> }
        </div>
      ) : filterBy === 'category' ? (
        <div className="self-center mx-auto my-auto ">
          {categoryData.length > 0 ?
            <PieChart data={categoryData} label="category" total={
              categoryData.reduce((a, b) => {return a += b.value}, 0)
            } /> :
          <p className="text-blue-100 text-center font-semibold font-jose my-auto">
            No income for this month yet.</p> }
        </div>
      ) : <div></div>}

      <div className="justify-self-end flex flex-col">
        <Button label="By Source" icon={filterBy === 'source' && <VscCircleFilled color="#FF7F00" />}
          color="blue"  onClick={() => setFilterBy('source')}
          extraClasses="w-48 mx-auto mb-2" />
        <Button label="By Category" icon={filterBy === 'category' && <VscCircleFilled color="#FF7F00" />}
          color="yellow" onClick={() => setFilterBy('category')}
          extraClasses="w-48 mx-auto" />
      </div>
    </div>
  )
}

export default IncomePie;
