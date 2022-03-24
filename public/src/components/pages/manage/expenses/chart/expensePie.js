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

const ExpensePie = ({ date }) => {
  const { expenses } = useSelector(state => state.expense);
  const [filterBy, setFilterBy] = useState('location');

  // Sum up the expenses from matching locations
  let locationTotals = {}
  const expensesThisMonth = expenses.filter(exp =>
    isSameMonth(new Date(exp.date), date));
  expensesThisMonth.forEach((exp, i) => {
    if (exp.location && exp.location.name)
      locationTotals[exp.location.name] =
        (locationTotals[exp.location.name] || 0) + exp.value });
  // Convert the locations/totals into a recharts-readable data array
  let locationData = [];
  for (let [key, value] of Object.entries(locationTotals)) {
    locationData.push({ name: capitalize(key), value: value, location: capitalize(key) });
  }

  // Sum up the expenses from matching categories
  let categoryTotals = {};
  const categoriesThisMonth = expenses.filter(exp =>
    isSameMonth(new Date(exp.date), date));
  categoriesThisMonth.forEach((exp, i) => {
    if (exp.category && exp.category.name)
      categoryTotals[exp.category.name] =
        (categoryTotals[exp.category.name] || 0) + exp.value });
  // Convert the categorys/totals into a recharts-readable data array
  let categoryData = [];
  for (let [key, value] of Object.entries(categoryTotals)) {
    categoryData.push({ name: capitalize(key), value: value, category: capitalize(key) });
  }

  return (
    <div className="flex flex-col h-full">
      {
        filterBy === 'location' ? (
          <div className="self-center mx-auto my-auto ">
            {locationData.length > 0 ?
              <PieChart data={locationData} label="location" total={
                locationData.reduce((a, b) => {return a += b.value}, 0)
              } /> :
            <p className="text-blue-100 text-center font-semibold font-jose my-auto">
              No expenses for this month yet.</p> }
          </div>
        ) :
        filterBy === 'category' ? (
          <div className="self-center mx-auto my-auto ">
            {categoryData.length > 0 ?
              <PieChart data={categoryData} label="category" total={
                categoryData.reduce((a, b) => {return a += b.value}, 0)
              } /> :
            <p className="text-blue-100 text-center font-semibold font-jose my-auto">
              No expenses for this month yet.</p> }
          </div>
        ) :
        <div></div>
      }

      {((filterBy === 'location' && locationData.length > 0) ||
       (filterBy === 'category' && categoryData.length > 0)) &&
        <div className="justify-self-end flex flex-col">
          <Button label="By Location" icon={filterBy === 'location' &&
            <VscCircleFilled color="#00FF00" />}
            color="indigo" onClick={() => setFilterBy('location')}
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

export default ExpensePie;
