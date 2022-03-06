// Import basics
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Import dispatch actions
import { getExpenses, addExpense, editExpense, clearExpenseError }
  from '../../../../../actions/expenseActions.js';
import { getCategories, clearCategoryError }
  from '../../../../../actions/categoryActions.js';
import { formatDateForInput } from '../../../../../functions/dates.js';
// Import icons
import { GiCheckMark } from 'react-icons/gi';
// Import components
import TextEntry   from '../../../../input/textEntry.js';
import SelectEntry from '../../../../input/selectEntry.js';
import Button      from '../../../../input/button.js';
import Message     from '../../../../misc/message.js';
import Spinner     from '../../../../misc/spinner.js';

const ExpenseGen = ({ editing=false }) => {
  // Get state variables from redux
  const { selected, expenses, loading: loadingExpense, error: expenseError } =
    useSelector(state => state.expense);
  const { categories, loading: loadingCategories, error: categoryError } =
    useSelector(state => state.category);
  const expenseCategories = categories.
    filter(cat => cat.type === 'expense').
    map(cat => { return { name: cat.name, value: cat._id } });

  // Get the categories and expenses upon loading
  const dispatch = useDispatch();
  const timer = useRef(null);
  useEffect(() => {
    if (!timer.current) {
      if (expenses.length === 0) dispatch(getExpenses());
      if (categories.length === 0) dispatch(getCategories());
      timer.current = setTimeout(() => {
        dispatch(clearExpenseError());
        dispatch(clearCategoryError());
        timer.current = null;
      }, [5000]);
    }
  }, [dispatch, categories]);

  // Set validation error messages
  const [msgs, setMsgs] = useState([]);
  // If editing, use the selected expense values, otherwise set defaults
  const [expense, setExpense] = useState({
    name: "",
    category: editing ?
      (selected && selected.category) :
      categories &&
        categories.filter(cat => cat.type === 'expense').length > 0 ?
        categories.filter(cat => cat.type === 'expense')[0] :
        "621c3770fab276bac7fdcb7f",
    location: editing ?
      (selected && selected.location) :
      "",
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

  // Check for valid entries and send the expense to the server
  const onSubmit = e => {
    e.preventDefault();
    let errors = [];
    if (expense.category === "" || expense.category === null) {
      errors.push("Expense category required.");
      setMsgs([...msgs, "Expense category required."]); }
    if (expense.value === "" || expense.value === null) {
      errors.push("Expense amount required.");
      setMsgs([...msgs, "Expense amount required."]); }
    if (errors.length === 0) {
      editing ?
        dispatch(editExpense(selected._id, expense)) :
        dispatch(addExpense(expense));
    }
    else { setTimeout(() => {
      errors = [];
      setMsgs([]); }, 5000); }
  }

  return (
    <form onSubmit={onSubmit}  className="p-4">
      {(loadingExpense || loadingCategories) ? <Spinner /> :
        <div className="flex flex-col">
          <TextEntry label="Location:"
            name="location"
            labelColor="text-yellow-400"
            value={expense.location}
            onChange={editInfo} />
          <TextEntry label="Total:"
            name="value"
            labelColor="text-yellow-400"
            value={expense.value}
            append={"$"}
            onChange={editInfo} />
          <SelectEntry label="Category:"
            name="category"
            options={expenseCategories}
            labelColor="text-yellow-400"
            value={expense.category}
            onChange={editInfo} />
          <TextEntry type='date' label="Date:"
            labelColor="text-yellow-400"
            name="date"
            value={expense.date}
            onChange={editInfo}
            extraClasses="mb-6" />
          <Button type="submit"
            label={editing ? "Save Changes" : "Save Expense"}
            icon={<GiCheckMark />} />

          {msgs.map(msg => <Message warning={msg} />)}
          {expenseError && <Message error={expenseError} />}
          {categoryError && <Message error={categoryError} />}
        </div>
      }
    </form>
  )
}

export default ExpenseGen;
