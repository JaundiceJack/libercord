// Import basic stuff
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
// Import icons
import { GiCheckMark }   from 'react-icons/gi';
// Import components
import CurrencyEntry     from '../../inputs/currencyEntry';
import SelectEntry       from '../../inputs/selectEntry';
import DateEntry         from '../../inputs/dateEntry';
import OptionalTextEntry from '../../inputs/optionalTextEntry';
// Import style presets
import { submitClasses,
        fancyText }      from '../../tailwinds';
// Import server actions
import { addIncome }     from '../../../actions/incomeActions';
// Import a helper function for date inputs
import { currentDate }   from '../../../functions/dateFunctions';


const AddIncome = ({toggleAdd}) => {
  // Make a dispatch to access the addIncome action
  const dispatch = useDispatch();
  // Get the category options from the store
  const categories = useSelector(state => state.income.categories);
  // Define an internal state to hold entries
  const [category, setCategory] = useState(categories);
  const [source, setSource]     = useState("");
  const [value, setValue]       = useState(null);
  const [date, setDate]         = useState(currentDate());
  const [addSource, setAddSrc]  = useState(false);
  // Prevent default submission and create the new income
  const onSubmit = (e) => {
    e.preventDefault();
    // Validate entries

    // Create a new income
    const newIncome = {
      category: category,
      source:   source,
      value:    value,
      date:     date + ' 00:00:00'
    }
    // Send the new income to the server/state to be added
    dispatch(addIncome(newIncome));
    // Hide the form on submission
    toggleAdd();
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col">
      <p className={fancyText+"mb-4 text-center"}>Add New Income:</p>
      <SelectEntry id="category" text="Type"
                   value   ={category}
                   onChange={e => setCategory(e.target.value)}
                   options ={categories} />
      <CurrencyEntry id="value" text="Paid"
                     value   ={value}
                     onChange={e => setValue(e.target.value)} />
      <DateEntry id="date" text="Date"
                 value   ={date}
                 onChange={e => setDate(e.target.value)} />
     <OptionalTextEntry id="source" onText="Src" offText="Source"
                        value   ={source}
                        toggle  ={addSource}
                        onToggle={() => setAddSrc(!addSource)}
                        onChange={e => setSource(e.target.value)}/>
      <div className="mb-4"></div>
      <button type="submit" className={submitClasses}>
        <GiCheckMark />
        <p className="ml-2">Save Income</p>
      </button>
    </form>
  );
};

AddIncome.propTypes = {
  addIncome: PropTypes.func,
  income:    PropTypes.object.isRequired,
  category:  PropTypes.string,
  source:    PropTypes.string,
  value:     PropTypes.number,
  date:      PropTypes.instanceOf(Date),
  addSource: PropTypes.bool,
  toggleAdd: PropTypes.func
}
export default AddIncome;
