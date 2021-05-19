// Import basics
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
// Import components
import CheckboxEntry        from '../../inputs/checkboxEntry';
// Import style presets
import { fancyText }        from '../../tailwinds';
// Import server actions
import { updateExpenseCol } from '../../../actions/expenseActions';

const ExpenseColumnSelection = () => {
  // Make a dispatch to access redux actions
  const dispatch = useDispatch();
  // Get the selectable columns from the store
  const columns = useSelector(state => state.expense.columns);

  // Change the visible columns when checked
  const onCheck = e => {
    const col = {name: e.target.name, text: e.target.value, view: e.target.checked}
    dispatch(updateExpenseCol(col));
  };

  return (
    <div className="">
      <p className={fancyText+"my-4 text-center"}>Toggle Columns:</p>
      {columns.map(col => {
        return (
          <CheckboxEntry id={col.name}
                         text={col.text}
                         checked={col.view}
                         onChange={onCheck} />
        )
      })}
    </div>
  );
};

ExpenseColumnSelection.propTypes = {
  updateExpenseCol: PropTypes.func,
  columns:         PropTypes.array
}
export default ExpenseColumnSelection;
