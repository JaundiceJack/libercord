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
         fancyText }     from '../../tailwinds';
// Import server actions
import { addExpense }    from '../../../actions/expenseActions';
// Import a helper function for date inputs
import { currentDate }   from '../../../functions/dateFunctions';

const AddExpense = ({toggleAdd}) => {
  // Make a dispatch to access the addExpense action
  const dispatch = useDispatch();
  // Get the category options from the store
  const categories = useSelector(state => state.expense.categories);
  // Define an internal state to hold entries
  const [category,  setCategory] = useState(categories);
  const [name,      setName]     = useState("");
  const [location,  setLocation] = useState("");
  const [value,     setValue]    = useState(null);
  const [date,      setDate]     = useState(currentDate());
  const [addLoc,    setAddLoc]   = useState(false);
  const [addName,   setAddName]  = useState(false);
  // Prevent default submission and create the new expense
  const onSubmit = (e) => {
    e.preventDefault();
    // Validate entries

    // Create a new expense
    const newExpense = {
      category: category,
      name:     name,
      location: location,
      value:    value,
      date:     date + ' 00:00:00'
    }
    // Send the new expense to the server/state to be added
    dispatch(addExpense(newExpense));
    // Hide the form on submission
    toggleAdd();
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col">
      <p className={fancyText+"my-4 text-center"}>Add New Expense:</p>
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
      <OptionalTextEntry id="location" onText="Loc" offText="Location"
                         value={location}
                         toggle={addLoc}
                         onToggle={() => setAddLoc(!addLoc)}
                         onChange={e => setLocation(e.target.value)}/>
      <OptionalTextEntry id="name" onText="Name" offText="Item Name"
                        value={name}
                        toggle={addName}
                        onToggle={() => setAddName(!addName)}
                        onChange={e => setName(e.target.value)}/>
      <div className="mb-4"></div>
      <button type="submit" className={submitClasses}>
        <GiCheckMark />
        <p className="ml-2">Save Expense</p>
      </button>
    </form>
  );
};

AddExpense.propTypes = {
  addExpense: PropTypes.func,
  expense:    PropTypes.object.isRequired,
  category:   PropTypes.string,
  name:       PropTypes.string,
  location:   PropTypes.string,
  value:      PropTypes.number,
  date:       PropTypes.instanceOf(Date),
  addLoc:     PropTypes.bool,
  addName:    PropTypes.bool,
  toggleAdd:  PropTypes.func
}
export default AddExpense;
