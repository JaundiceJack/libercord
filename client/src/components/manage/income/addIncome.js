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
        errorMsgClasses }from '../../tailwinds';
// Import server actions
import { addIncome }     from '../../../actions/incomeActions';
// Import a helper function for date inputs
import { currentDate }   from '../../../functions/dateFunctions';

const AddIncome = ({toggleAdd}) => {
  // Get the category options from the store
  const categories = useSelector( state => state.income.categories );
  // Define an internal state to hold entries
  const [category,   setCategory]   = useState("Fulltime Job");
  const [source,     setSource]     = useState("");
  const [value,      setValue]      = useState(null);
  const [date,       setDate]       = useState(currentDate());
  const [addSource,  setAddSrc]     = useState(false);
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

  // Prevent default submission and create the new income
  const dispatch = useDispatch();
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

    // Create a new income
    if (errs.length === 0 && !clearTimer.current) {
      const newIncome = {
        category: category,
        source:   source,
        value:    value,
        date:     date + ' 00:00:00'
      }
      // Send the new income to the server/state to be added
      dispatch(addIncome(newIncome));
    }

    // Hide the form on submission
    errs.length !== 0 && !clearTimer.current ?
      setClear() : toggleAdd();
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col">
      <p className={fancyText+"my-4 text-center"}>Add New Income:</p>
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
     <OptionalTextEntry id="source" onText="Src" offText="Source"
                        value   ={source}
                        toggle  ={addSource}
                        onToggle={() => setAddSrc(!addSource)}
                        onChange={e => setSource(e.target.value)}/>
      { badEntries.map(err => <div className={errorMsgClasses}>{err}</div> )  }
      <div className="mb-4"></div>
      <button type="submit" className={submitClasses}>
        <GiCheckMark />
        <p className="ml-2 mt-1 font-jose text-base ">Save Income</p>
      </button>
    </form>
  );
};

// Set the prop types and export
AddIncome.propTypes = {
  addIncome:  PropTypes.func,
  categories: PropTypes.array,
  category:   PropTypes.string,
  source:     PropTypes.string,
  value:      PropTypes.number,
  date:       PropTypes.instanceOf(Date),
  addSource:  PropTypes.bool,
  toggleAdd:  PropTypes.func
}
export default AddIncome;
