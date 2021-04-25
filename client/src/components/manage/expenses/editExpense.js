// Import basics
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { editExpense }   from '../../../actions/expenseActions';
// Import a date formatter
import { inputDate }     from '../../../functions/dateFunctions';

const EditExpense = ({ toggleEdit }) => {
  // Get the selected expense and selectable categories from the store
  const selected   = useSelector( state => state.expense.selectedExpense );
  const categories = useSelector( state => state.expense.categories );
  // Set internal component state variables
  const [id,         setId]         = useState(selected._id);
  const [category,   setCategory]   = useState(selected.category);
  const [value,      setValue]      = useState(selected.value);
  const [name,       setName]       = useState(selected.name);
  const [location,   setLocation]   = useState(selected.location);
  const [date,       setDate]       = useState(inputDate(selected.date));
  const [addName,    setAddName]    = useState(selected.name     ? true : false);
  const [addLoc,     setAddLoc]     = useState(selected.location ? true : false);
  const [badEntries, setBadEntries] = useState([]);

  // Update the entries when a new item is selected
  const updateTimer = useRef(null);
  const setUpdate   = () => {
    setId(      selected._id);
    setCategory(selected.category);
    setValue(   selected.value);
    setName(    selected.name);
    setLocation(selected.location);
    setDate(
      inputDate(selected.date));
    setAddName( selected.name ? true : false);
    setAddLoc(  selected.location ? true : false);
  	updateTimer.current = setTimeout(() => {
      updateTimer.current = null; }, 100);
  }
  // Clear errors after 5 seconds
  const clearTimer = useRef(null);
  const setClear = () => {
    clearTimer.current = setTimeout(() => {
      setBadEntries([]);
      clearTimer.current = null; }, 5000);
  }
  // Update the selected properties on render
  useEffect(() => { !updateTimer.current && setUpdate() }, [selected]);
  // Clear timers on unmount to prevent memory leaks
  useEffect(() => {
    return ()  => {
      clearTimer.current  && clearTimeout(clearTimer.current)
      updateTimer.current && clearTimeout(updateTimer.current)}}, []);

  // Edit the selected expense with the new entries
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

    // Edit the item with the new entries
    if (errs.length === 0 && !clearTimer.current) {
      const edits = {
        _id:      id,
        category: category,
        name:     name,
        location: location,
        value:    value,
        date:     date + ' 00:00:00'
      }
      dispatch(editExpense(edits));
    }

    // Hide the form on submission
    errs.length !== 0 && !clearTimer.current ?
      setClear() : toggleEdit();
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col">
      <p className={fancyText+"my-4 text-center"}>Edit Selected:</p>
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
      <OptionalTextEntry id="name" onText="Name" offText ="Name"
                        value   ={name}
                        toggle  ={addName}
                        onToggle={() => setAddName(!addName)}
                        onChange={e => setName(e.target.value)} />
      <OptionalTextEntry id="location" onText="Loc" offText ="Location"
                         value   ={location}
                         toggle  ={addLoc}
                         onToggle={() => setAddLoc(!addLoc)}
                         onChange={e => setLocation(e.target.value)} />
      { badEntries.map(err => <div className={errorMsgClasses}>{err}</div> )  }
      <div className="mb-4"></div>
      <button type="submit" className={submitClasses}>
        <GiCheckMark />
        <p className="ml-2 mt-1 font-jose text-base ">Save Changes</p>
      </button>
    </form>
  );
};

EditExpense.propTypes = {
  toggleEdit:  PropTypes.func,
  editExpense: PropTypes.func,
  selected:    PropTypes.object,
  categories:  PropTypes.array,
  _id:         PropTypes.string,
  category:    PropTypes.string,
  name:        PropTypes.string,
  location:    PropTypes.string,
  value:       PropTypes.number,
  date:        PropTypes.instanceOf(Date),
  toggleEdit:  PropTypes.func
}
export default EditExpense;
