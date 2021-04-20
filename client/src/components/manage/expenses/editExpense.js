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
         fancyText }     from '../../tailwinds';
// Import server actions
import { editExpense }   from '../../../actions/expenseActions';
// Import a date formatter
import { inputDate }     from '../../../functions/dateFunctions';

const EditExpense = ({ toggleEdit }) => {
  // Make a dispatch to access redux actions
  const dispatch = useDispatch();
  // Get the selected expense and selectable categories from the store
  const selected   = useSelector( state => state.expense.selectedExpense );
  const categories = useSelector( state => state.expense.categories );

  // Update the entries if a new expense item is selected
  const updateTimer = useRef(null);
  function setUpdate() {
    const nextSelect = selected;
    setId(nextSelect._id);
    setCategory(nextSelect.category);
    setValue(nextSelect.value);
    setName(nextSelect.name);
    setLocation(nextSelect.location);
    setDate(inputDate(nextSelect.date));
    setAddName(nextSelect.name ? true : false);
    setAddLoc(nextSelect.location ? true : false);
  	updateTimer.current = setTimeout(() => {
      updateTimer.current = null; }, 100);
  }
  useEffect(() => { !updateTimer.current && setUpdate() }, [selected]);
  useEffect(() => { return () =>
    { updateTimer.current && clearTimeout(updateTimer.current); }; }, []);

  // Set internal component state variables
  const [id,       setId]       = useState(selected._id);
  const [category, setCategory] = useState(selected.category);
  const [value,    setValue]    = useState(selected.value);
  const [name,     setName]     = useState(selected.name);
  const [location, setLocation] = useState(selected.location);
  const [date,     setDate]     = useState(inputDate(selected.date));
  const [addName,  setAddName]  = useState(selected.name ? true : false);
  const [addLoc,   setAddLoc]   = useState(selected.location ? true : false);

  // Prevent default submission and create the new expense
  const onSubmit = (e) => {
    e.preventDefault();
    // Validate entries

    // Edit the item with the new entries
    const edits = {
      _id:      id,
      category: category,
      name:     name,
      location: location,
      value:    value,
      date:     date + ' 00:00:00'
    }
    // Send the item to the server/state to be added
    dispatch(editExpense(edits));
    // Hide the form on submission
    toggleEdit();
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col">
      <p className={fancyText+"my-4 text-center"}>Edit Selected:</p>
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
      <div className="mb-4"></div>
      <button type="submit" className={submitClasses}>
        <GiCheckMark />
        <p className="ml-2">Save Changes</p>
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
