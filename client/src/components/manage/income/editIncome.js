// Import basics
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
// Import server actions
import { editIncome }    from '../../../actions/incomeActions';
// Import components
import CurrencyEntry     from '../../inputs/currencyEntry';
import SelectEntry       from '../../inputs/selectEntry';
import DateEntry         from '../../inputs/dateEntry';
import OptionalTextEntry from '../../inputs/optionalTextEntry';
// Import style presets
import { submitClasses, fancyText } from '../../tailwinds';
// Import icons
import { GiCheckMark }   from 'react-icons/gi';
// Import a date formatter
import { inputDate }     from '../../../functions/dateFunctions';

const EditIncome = ({ toggleEdit }) => {
  // Make a dispatch to access redux actions
  const dispatch = useDispatch();
  // Get the selected income and selectable categories from the store
  const selected   = useSelector( state => state.income.selectedIncome );
  const categories = useSelector( state => state.income.categories );

  // Update the entries if a new income item is selected
  const updateTimer = useRef(null);
  function setUpdate() {
    const nextSelect = selected;
    setId(nextSelect._id);
    setCategory(nextSelect.category);
    setValue(nextSelect.value);
    setSource(nextSelect.source);
    setDate(inputDate(nextSelect.date));
    setAddSrc(nextSelect.source ? true : false);
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
  const [source,   setSource]   = useState(selected.source);
  const [date,     setDate]     = useState(inputDate(selected.date));
  const [addSrc,   setAddSrc]   = useState(selected.source ? true : false);

  // Prevent default submission and create the new income
  const onSubmit = (e) => {
    e.preventDefault();
    // Validate entries

    // Edit the item with the new entries
    const edits = {
      _id:      id,
      category: category,
      source:   source,
      value:    value,
      date:     date + ' 00:00:00'
    }
    // Send the item to the server/state to be added
    dispatch(editIncome(edits));
    // Hide the form on submission
    toggleEdit();
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col">
      <p className={fancyText+"my-4 text-center"}>Edit Selected:</p>
      <SelectEntry id      ="category"
                   text    ="Type"
                   value   ={category}
                   onChange={e => setCategory(e.target.value)}
                   options ={categories} />
      <CurrencyEntry id      ="value"
                     text    ="Paid"
                     value   ={value}
                     onChange={e => setValue(e.target.value)} />
      <DateEntry id      ="date"
                 text    ="Date"
                 value   ={date}
                 onChange={e => setDate(e.target.value)} />
     <OptionalTextEntry id="source" onText="Src" offText="Source"
                        value   ={source}
                        toggle  ={addSrc}
                        onToggle={() => setAddSrc(!addSrc)}
                        onChange={e => setSource(e.target.value)} />
      <div className="mb-4"></div>
      <button type="submit" className={submitClasses}>
        <GiCheckMark />
        <p className="ml-2">Save Changes</p>
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
