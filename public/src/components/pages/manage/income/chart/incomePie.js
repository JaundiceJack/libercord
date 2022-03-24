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

const IncomePie = ({ date }) => {
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

  return (
    <div className="flex flex-col h-full">
      {
        filterBy === 'source' ? (
          <div className="self-center mx-auto my-auto ">
            {sourceData.length > 0 ?
              <PieChart data={sourceData} label="source" total={
                sourceData.reduce((a, b) => {return a += b.value}, 0)
              } /> :
            <p className="text-blue-100 text-center font-semibold font-jose">
              No income for this month yet.</p> }
          </div>
        ) :
        filterBy === 'category' ? (
          <div className="self-center mx-auto my-auto ">
            {categoryData.length > 0 ?
              <PieChart data={categoryData} label="category" total={
                categoryData.reduce((a, b) => {return a += b.value}, 0)
              } /> :
            <p className="text-blue-100 text-center font-semibold font-jose">
              No income for this month yet.</p> }
          </div>
        ) :
        <div></div>
      }

      {((filterBy === 'source' && sourceData.length > 0) ||
       (filterBy === 'category' && categoryData.length > 0)) &&
       <div className="justify-self-end flex flex-col">
         <Button label="By Source" icon={filterBy === 'source' &&
           <VscCircleFilled color="#00FF00" />}
           color="indigo"  onClick={() => setFilterBy('source')}
           extraClasses="w-48 mx-auto mb-2" />
         <Button label="By Category" icon={filterBy === 'category' &&
           <VscCircleFilled color="#00FF00" />}
           color="yellow" onClick={() => setFilterBy('category')}
           extraClasses="w-48 mx-auto" />
       </div>
     }

    </div>
  )
}

export default IncomePie;
