// Import basics
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
// Import icons
import { GiCheckMark }   from 'react-icons/gi';
// Import server actions
import { editIncome }    from '../../../actions/incomeActions';
// Import components
import CurrencyEntry     from '../../inputs/currencyEntry';
import SelectEntry       from '../../inputs/selectEntry';
import DateEntry         from '../../inputs/dateEntry';
import OptionalTextEntry from '../../inputs/optionalTextEntry';
// Import style presets
import { submitClasses,
         fancyText,
         errorMsgClasses } from '../../tailwinds';
// Import a date formatter
import { inputDate }     from '../../../functions/dateFunctions';

// So, there's a bug here
// When an item is selected, and edit is pressed, and the table is sorted,
// the user is locked into the edit box,
// when instead when the table is sorted,
// maybe something where if selected is null, it shoots off a toggleEdit
// and run the update function each second

// i think not here, in the incomeOptions, i need to put the editing state,
// in the store, and when the sort action is issued, change editing to false,




const EditIncome = ({ toggleEdit }) => {
  // Get the selected income and selectable categories from the store
  const selected   = useSelector( state => state.income.selectedIncome );
  const categories = useSelector( state => state.income.categories );
  // Set internal component state variables
  const [id,         setId]         = useState(selected._id);
  const [category,   setCategory]   = useState(selected.category);
  const [value,      setValue]      = useState(selected.value.replace("$", ""));
  const [source,     setSource]     = useState(selected.source);
  const [date,       setDate]       = useState(inputDate(selected.date));
  const [addSrc,     setAddSrc]     = useState(selected.source ? true : false);
  const [badEntries, setBadEntries] = useState([]);

  // Update the entries when a new item is selected
  const updateTimer = useRef(null);
  const setUpdate   = () => {
    setId(      selected._id);
    setCategory(selected.category);
    setValue(   selected.value.replace("$", ""));
    setSource(  selected.source);
    setDate(
      inputDate(selected.date));
    setAddSrc(  selected.source ? true : false);
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

    // Edit the item with the new entries
    if (errs.length === 0 && !clearTimer.current) {
      const edits = {
        _id:      id,
        category: category,
        source:   source,
        value:    value,
        date:     date + ' 00:00:00'
      }
      // Send the item to the server/state to be added
      dispatch(editIncome(edits));
    }

    // Hide the form on submission
    errs.length !== 0 && !clearTimer.current ?
      setClear() : toggleEdit();
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col">
      <p className={fancyText+"my-4 text-center"}>Edit Selected:</p>
      <SelectEntry id      ="category"
                   text    ="Type"
                   value   ={category}
                   onChange={e => setCategory(e.target.value)}
                   options ={categories} required={true} />
      <CurrencyEntry id      ="value"
                     text    ="Paid"
                     value   ={value}
                     onChange={e => setValue(e.target.value)} required={true} />
      <DateEntry id      ="date"
                 text    ="Date"
                 value   ={date}
                 onChange={e => setDate(e.target.value)} required={true} />
     <OptionalTextEntry id="source" onText="Src" offText="Source"
                        value   ={source}
                        toggle  ={addSrc}
                        onToggle={() => setAddSrc(!addSrc)}
                        onChange={e => setSource(e.target.value)} />
      <div className="mb-4"></div>
      <button type="submit" className={submitClasses}>
        <GiCheckMark />
        <p className="ml-2 mt-1 font-jose text-base ">Save Changes</p>
      </button>
    </form>
  );
};

EditIncome.propTypes = {
  toggleEdit: PropTypes.func,
  editIncome: PropTypes.func,
  selected:   PropTypes.object,
  categories: PropTypes.array,
  _id:        PropTypes.string,
  category:   PropTypes.string,
  source:     PropTypes.string,
  value:      PropTypes.number,
  date:       PropTypes.instanceOf(Date),
  toggleEdit: PropTypes.func
}
export default EditIncome;
