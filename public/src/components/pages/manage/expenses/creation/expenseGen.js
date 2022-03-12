// Import basics
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Import dispatch actions
import { addExpense, editExpense, clearExpenseError }
  from '../../../../../actions/expenseActions.js';
import { getCategories, deleteCategory, clearCategoryError }
  from '../../../../../actions/categoryActions.js';
import { getLocations, deleteLocation, clearLocationError }
  from '../../../../../actions/locationActions.js';
import { formatDateForInput } from '../../../../../functions/dates.js';
// Import icons
import { GiCheckMark } from 'react-icons/gi';
// Import components
import TextEntry   from '../../../../input/textEntry.js';
import Button      from '../../../../input/button.js';
import Message     from '../../../../misc/message.js';
import Spinner     from '../../../../misc/spinner.js';
import FormSelection from '../../../../input/formSelection.js';

const ExpenseGen = ({ editing=false }) => {
  // Get state variables from redux
  const { selected, loading: loadingExpense, error: expenseError } =
    useSelector(state => state.expense);
  const { categories, loading: loadingCategories, error: categoryError } =
    useSelector(state => state.category);
  const { locations, loading: loadingLocations, error: locationError } =
    useSelector(state => state.location);

  // Filter out categories with type: expense
  const expenseCategories = categories.filter(cat => cat.type === 'expense');

  // Set validation error messages
  const [msgs, setMsgs] = useState([]);
  // If editing, use the selected expense values, otherwise set defaults
  const [expense, setExpense] = useState({
    name: "",
    category: "",
    location: "",
    newLocation: "",
    newCategory: "",
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
  // Set a function to modify the expense values from input elements
  const editInfo = e => { setExpense({...expense, [e.target.name]: e.target.value })}

  // Get the locations and categories upon loading
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getLocations());
  }, []);
  // If locations or categories updates, load the expense defaults
  useEffect(() => {
    if (!editing) setExpense(exp => {
      return { ...exp,
        category: (expenseCategories[0] && expenseCategories[0]._id),
        location: (locations[0] && locations[0]._id) }
    })
  }, [editing, categories, locations]);

  // Clear errors after 5 seconds
  const timer = useRef(null);
  useEffect(() => {
    // Clear errors after 5 seconds
    if (!timer.current) {
      timer.current = setTimeout(() => {
        expenseError  && dispatch(clearExpenseError());
        categoryError && dispatch(clearCategoryError());
        locationError && dispatch(clearLocationError());
        timer.current = null;
      }, [5000]);
    }
    // Clear out the timer on unmount
    return () => { timer.current && clearTimeout(timer.current) }
  }, [expenseError, categoryError, locationError]);

  // Validate entries
  const validateEntries = () => {
    let errors = [];
    if (expense.location === "" && expense.newLocation === "") {
      errors.push("Expense location required."); }
    if (expense.category === "" && expense.newCategory === "") {
      errors.push("Expense category required."); }
    if (expense.value === "" || expense.value === null) {
      errors.push("Expense amount required."); }
    if (isNaN(Number(expense.value))) {
      errors.push("Expense amount must be a number."); }
    setMsgs(errors);
    return errors;
  }
  // Submit entries
  const submitEntries = () => {
    editing ?
      dispatch(editExpense(selected._id, expense)) :
      dispatch(addExpense(expense));
  }
  // Check for valid entries and send the expense to the server
  const onSubmit = e => {
    e.preventDefault();
    validateEntries().length === 0 ?
      submitEntries() :
      setTimeout(() => setMsgs([]), 5000)
  }

  return (
    <form onSubmit={onSubmit}  className="p-4">
      {(loadingExpense || loadingCategories || loadingLocations) ? <Spinner /> :
        <div className="flex flex-col">
          <FormSelection values={expense} items={locations}
            label="Location:" newLabel="Location:"
            name="location" newName="newLocation"
            onEdit={editInfo} onEditNew={editInfo}
            onDelete={() => expense.location && dispatch(deleteLocation(expense.location))} />

          <TextEntry label="Total:" name="value"
            value={(expense && expense.value) || ""} onChange={editInfo}
            labelColor="text-yellow-400" placeholder="Enter total cost"
            append={"$"} />

          <FormSelection values={expense} items={categories.filter(cat => cat.type === 'expense')}
            label="Category:" newLabel="Category:"
            name="category" newName="newCategory"
            onEdit={editInfo} onEditNew={editInfo}
            onDelete={() => expense.category && dispatch(deleteCategory(expense.category))} />

          <TextEntry type='date' label="Date:" name="date"
            value={expense && expense.date} onChange={editInfo}
            labelColor="text-yellow-400" extraClasses="mb-6" />

          <Button type="submit"
            label={editing ? "Save Changes" : "Save Expense"}
            extraClasses="w-36 self-center"
            icon={<GiCheckMark />} />

          {msgs.map(msg =>  <Message warning={msg} />)}
          {expenseError  && <Message error={expenseError} />}
          {categoryError && <Message error={categoryError} />}
          {locationError && <Message error={locationError} />}
        </div>
      }
    </form>
  )
}

export default ExpenseGen;
