// Import basics
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Import dispatch actions
import { addIncome, editIncome, clearIncomeError }
  from '../../../../../actions/incomeActions.js';
import { getCategories, deleteCategory, clearCategoryError }
  from '../../../../../actions/categoryActions.js';
import { getSources, deleteSource, clearSourceError }
  from '../../../../../actions/sourceActions.js';
import { formatDateForInput } from '../../../../../functions/dates.js';
// Import icons
import { GiCheckMark } from 'react-icons/gi';
// Import components
import TextEntry   from '../../../../input/textEntry.js';
import Button      from '../../../../input/button.js';
import Message     from '../../../../misc/message.js';
import Spinner     from '../../../../misc/spinner.js';
import FormSelection from '../../../../input/formSelection.js';

const IncomeGen = ({ editing=false }) => {
  // Get state variables from redux
  const { selected, loading: loadingIncome, error: incomeError } =
    useSelector(state => state.income);
  const { categories, loading: loadingCategories, error: categoryError } =
    useSelector(state => state.category);
  const { sources, loading: loadingSources, error: sourceError } =
    useSelector(state => state.source);

  // Filter out categories with type: income
  const incomeCategories = categories.filter(cat => cat.type === 'income');

  // Set validation error messages
  const [msgs, setMsgs] = useState([]);
  // If editing, use the selected income values, otherwise set defaults
  const [income, setIncome] = useState({
    name: "",
    category: (editing && selected && selected.category) ?
      selected.category._id : "",
    source: (editing && selected && selected.source) ?
      selected.source._id : "",
    newCategory: "",
    newSource: "",
    value: editing ?
      (selected && selected.value) :
      "",
    date: editing ?
      (selected && formatDateForInput(new Date(selected.date))) :
      formatDateForInput(new Date()),
    currency: editing ?
      (selected && selected.currency) :
      "$",
  });
  // Set a function to modify the income values from input elements
  const editInfo = e => { setIncome({...income, [e.target.name]: e.target.value })}

  // Get the sources and categories upon loading
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getSources());
  }, []);
  // If sources or categories updates, load the income defaults
  useEffect(() => {
    if (!editing) setIncome(inc => {
      return { ...inc,
        category: (incomeCategories[0] && incomeCategories[0]._id),
        source: (sources[0] && sources[0]._id) }
    })
  }, [editing, categories, sources]);

  // Clear errors after 5 seconds
  const timer = useRef(null);
  useEffect(() => {
    // Clear errors after 5 seconds
    if (!timer.current) {
      timer.current = setTimeout(() => {
        incomeError  && dispatch(clearIncomeError());
        categoryError && dispatch(clearCategoryError());
        sourceError && dispatch(clearSourceError());
        timer.current = null;
      }, [5000]);
    }
    // Clear out the timer on unmount
    return () => { timer.current && clearTimeout(timer.current) }
  }, [incomeError, categoryError, sourceError]);

  // Validate entries
  const validateEntries = () => {
    let errors = [];
    if (income.source === "" && income.newSource === "") {
      errors.push("Income source required."); }
    if (income.category === "" && income.newCategory === "") {
      errors.push("Income category required."); }
    if (income.value === "" || income.value === null) {
      errors.push("Income amount required."); }
    if (isNaN(Number(income.value))) {
      errors.push("Income amount must be a number."); }
    setMsgs(errors);
    return errors;
  }
  // Submit entries
  const submitEntries = () => {
    editing ?
      dispatch(editIncome(selected._id, income)) :
      dispatch(addIncome(income));
  }
  // Check for valid entries and send the income to the server
  const onSubmit = e => {
    e.preventDefault();
    validateEntries().length === 0 ?
      submitEntries() :
      setTimeout(() => setMsgs([]), 5000)
  }

  return (
    <form onSubmit={onSubmit} className="p-4">
      {(loadingIncome || loadingCategories || loadingSources) ? <Spinner /> :
        <div className="flex flex-col">

          <FormSelection values={income} items={sources}
            label="Source:" newLabel="Source:"
            name="source" newName="newSource"
            onEdit={editInfo} onEditNew={editInfo}
            onDelete={() => income.source && dispatch(deleteSource(income.source))} />

          <TextEntry label="Amount:" name="value"
            value={(income && income.value) || ""} onChange={editInfo}
            labelColor="text-yellow-400" placeholder="Enter payment"
            append={"$"} />

          <FormSelection values={income} items={categories.filter(cat => cat.type === 'income')}
            label="Category:" newLabel="Category:"
            name="category" newName="newCategory"
            onEdit={editInfo} onEditNew={editInfo}
            onDelete={() => income.category && dispatch(deleteCategory(income.category))} />

          <TextEntry type='date' label="Date:" name="date"
            value={income && income.date} onChange={editInfo}
            labelColor="text-yellow-400" extraClasses="mb-6" />

          <Button type="submit"
            label={editing ? "Save Changes" : "Save Income"}
            extraClasses="w-36 self-center"
            icon={<GiCheckMark />} />

          {msgs.map(msg =>  <Message warning={msg} />)}
          {incomeError   && <Message error={incomeError} />}
          {categoryError && <Message error={categoryError} />}
          {sourceError   && <Message error={sourceError} />}
        </div>
      }
    </form>
  )
}

export default IncomeGen;
