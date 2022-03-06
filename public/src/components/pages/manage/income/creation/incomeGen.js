// Import basics
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Import dispatch actions
import { getIncomes, addIncome, editIncome, clearIncomeError }
  from '../../../../../actions/incomeActions.js';
import { getCategories, clearCategoryError }
  from '../../../../../actions/categoryActions.js';
import { getSources, clearSourceError }
  from '../../../../../actions/sourceActions.js';
import { formatDateForInput } from '../../../../../functions/dates.js';
// Import icons
import { GiCheckMark } from 'react-icons/gi';
import { TiBackspaceOutline } from 'react-icons/ti';
// Import components
import TextEntry   from '../../../../input/textEntry.js';
import SelectEntry from '../../../../input/selectEntry.js';
import Button      from '../../../../input/button.js';
import Message     from '../../../../misc/message.js';
import Spinner     from '../../../../misc/spinner.js';

const IncomeGen = ({ editing=false }) => {
  // Get state variables from redux
  const { selected, incomes, loading: loadingIncome, error: incomeError } =
    useSelector(state => state.income);
  const { categories, loading: loadingCategories, error: categoryError } =
    useSelector(state => state.category);
  const [addingCategory, setAddingCategory] = useState(false);
  const toggleNewCat = () => { setAddingCategory(!addingCategory) };
  const { sources, loading: loadingSources, error: sourceError } =
    useSelector(state => state.source);
  const [addingSource, setAddingSource] = useState(false);
  const toggleNewSrc = () => { setAddingSource(!addingSource) };

  const incomeCategories = categories
    .filter(cat => cat.type === 'income')
    .map(cat => { return { name: cat.name, value: cat._id } });
  const incomeSources = sources
    .map(src => { return { name: src.name, value: src._id }})

  // Get the categories and incomes upon loading
  const dispatch = useDispatch();
  const timer = useRef(null);
  useEffect(() => {
    if (!timer.current) {
      if (incomes.length === 0) dispatch(getIncomes());
      if (categories.length === 0) dispatch(getCategories());
      if (sources.length === 0 ) dispatch(getSources());
      timer.current = setTimeout(() => {
        dispatch(clearIncomeError());
        dispatch(clearCategoryError());
        dispatch(clearSourceError());
        timer.current = null;
      }, [5000]);
    }
  }, [dispatch, incomes, categories, sources]);

  // Set validation error messages
  const [msgs, setMsgs] = useState([]);
  // If editing, use the selected income values, otherwise set defaults
  const [income, setIncome] = useState({
    name: "",
    category: editing ?
      (selected && selected.category) :
      categories &&
        categories.filter(cat => cat.type === 'income').length > 0 ?
        categories.filter(cat => cat.type === 'income')[0] :
        "621c4f98fab276bac7fdcb82",
    newCategory: "",
    source: editing ?
      (selected && selected.source) :
      "",
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

  // Check for valid entries and send the income to the server
  const onSubmit = e => {
    e.preventDefault();
    let errors = [];
    if (income.source === "") {
      errors.push("Income source required.");
      setMsgs([...msgs, "Income source required."]); }
    if ((income.category === "" || income.category === null) && income.newSource === "") {
      errors.push("Income category required.");
      setMsgs([...msgs, "Income category required."]); }
    if (income.value === "" || income.value === null) {
      errors.push("Income amount required.");
      setMsgs([...msgs, "Income amount required."]); }
    if (errors.length === 0) {
      editing ? dispatch(editIncome(selected._id, income)) : dispatch(addIncome(income));
    }
    else { setTimeout(() => {
      errors = [];
      setMsgs([]); }, 5000); }
  }

  return (
    <form onSubmit={onSubmit} className="p-4">
      {(loadingIncome || loadingCategories) ? <Spinner /> :
        <div className="flex flex-col">
          {addingSource ?
            <TextEntry label="Source:"
              labelColor="text-yellow-400"
              placeholder="Enter new source"
              name="newSource"
              value={income.newSource}
              onChange={editInfo}
              append={
                <Button icon={<TiBackspaceOutline/>}
                  color="gray"
                  title="Return to selections"
                  onClick={toggleNewSrc}
                  appended={true} />} /> :

            <SelectEntry label="Source:"
              labelColor="text-yellow-400"
              name="source"
              value={income.source}
              options={incomeSources}
              onChange={editInfo}
              append={
                <Button label="New"
                  color="yellow"
                  onClick={toggleNewSrc}
                  appended={true} />} />

          }
          <TextEntry label="Amount:"
            labelColor="text-yellow-400"
            name="value"
            value={income.value}
            onChange={editInfo}
            append={"$"} />
          {addingCategory ?
            <TextEntry label="Category:"
              labelColor="text-yellow-400"
              placeholder="Enter new category"
              name="newCategory"
              value={income.newCategory}
              onChange={editInfo}
              append={
                <Button icon={<TiBackspaceOutline/>}
                  color="gray"
                  title="Return to selections"
                  onClick={toggleNewCat}
                  appended={true} />} /> :

            <SelectEntry label="Category:"
              labelColor="text-yellow-400"
              name="category"
              value={income.category}
              options={incomeCategories}
              onChange={editInfo}
              append={
                <Button label="New"
                  color="yellow"
                  onClick={toggleNewCat}
                  appended={true} />} />

          }
          <TextEntry type='date' label="Date:"
            labelColor="text-yellow-400"
            name="date"
            value={income.date}
            onChange={editInfo}
            extraClasses="mb-6" />

          <Button type="submit"
            label={editing ? "Save Changes" : "Save Income"}
            icon={<GiCheckMark />} />

          {msgs.map(msg => <Message warning={msg} />)}
          {incomeError && <Message error={incomeError} />}
          {categoryError && <Message error={categoryError} />}
        </div>
      }
    </form>
  )
}

export default IncomeGen;
