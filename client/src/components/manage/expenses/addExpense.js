// Import basic stuff
import React, { useState, useRef, useEffect } from 'react';
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
         fancyText,
         errorMsgClasses}from '../../tailwinds';
// Import server actions
import { addExpense }    from '../../../actions/expenseActions';
import { clearErrors }   from '../../../actions/errorActions';
// Import a helper function for date inputs
import { currentDate }   from '../../../functions/dateFunctions';

const AddExpense = ({toggleAdd}) => {
  // Get the category options and server errors from the store
  const categories = useSelector( state => state.expense.categories );
  // Define an internal state to hold entries
  const [category,   setCategory]   = useState(categories[0]);
  const [name,       setName]       = useState("");
  const [location,   setLocation]   = useState("");
  const [value,      setValue]      = useState(null);
  const [date,       setDate]       = useState(currentDate());
  const [addLoc,     setAddLoc]     = useState(false);
  const [addName,    setAddName]    = useState(false);
  const [badEntries, setBadEntries] = useState([]);

  // Clear the badEntries after the timer runs out
  const clearTimer = useRef(null);
  const setClear   = () => {
    clearTimer.current = setTimeout(() => {
      setBadEntries([]);
      clearTimer.current = null;
    }, 5000);
  }
  // Clear the timer on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      clearTimer.current && clearTimeout(clearTimer.current) } }, []);

  // Prevent default submission and create the new expense
  const dispatch   = useDispatch();
  const onSubmit = (e) => {
    e.preventDefault();
    // Validate entries
    let errs = []
    if (category === "" || category === null)
      errs.push("Please select a category");
    if ( typeof value === 'number' )
      errs.push("Amount paid must be a number.");
    if ( value === "" || value === null )
      errs.push("Please enter an amount paid.")
    if (date instanceof Date && !isNaN(date.valueOf()))
      errs.push("Please enter a valid date.");
    setBadEntries(errs);

    // Create a new expense
    if (errs.length === 0 && !clearTimer.current) {
      const newExpense = {
        category: category,
        name:     name,
        location: location,
        value:    value,
        date:     date + ' 00:00:00'
      }
      dispatch(addExpense(newExpense));
    }

    // Hide the form on submission
    errs.length !== 0 && !clearTimer.current ?
      setClear() : toggleAdd();
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col">
      <p className={fancyText+"my-4 text-center"}>Add New Expense:</p>
      <SelectEntry id="category" text="Type"
                   value   ={category}
                   onChange={e => setCategory(e.target.value)}
                   options ={categories} required={true} />
      <CurrencyEntry id="value" text="Paid"
                     value   ={value}
                     onChange={e => setValue(e.target.value)} required={true} />
      <DateEntry id="date" text="Date"
                 value   ={date}
                 onChange={e => setDate(e.target.value)} required={true} />
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
      { badEntries.map(err => <div className={errorMsgClasses}>{err}</div> )  }
      <div className="mb-4"></div>
      <button type="submit" className={submitClasses }>
        <GiCheckMark />
        <p className="ml-2 mt-1 font-jose text-base ">Save Expense</p>
      </button>
    </form>
  );
};

// Set the prop types and export
AddExpense.propTypes = {
  addExpense: PropTypes.func,
  categories: PropTypes.array,
  category:   PropTypes.string,
  name:       PropTypes.string,
  location:   PropTypes.string,
  value:      PropTypes.number,
  date:       PropTypes.instanceOf(Date),
  addLoc:     PropTypes.bool,
  addName:    PropTypes.bool,
  toggleAdd:  PropTypes.func,
  badEntries: PropTypes.array
}
export default AddExpense;
