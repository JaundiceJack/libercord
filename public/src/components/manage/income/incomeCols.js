// Import basics
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
// Import server actions
import { updateIncomeCol } from '../../../actions/incomeActions';
// Import components
import CheckboxEntry       from '../../inputs/checkboxEntry';
// Import style presets
import { fancyText }       from '../../tailwinds';

const IncomeColumnSelection = () => {
  // Make a dispatch to access redux actions
  const dispatch = useDispatch();
  // Get the selectable columns from the store
  const columns = useSelector(state => state.income.columns);

  // Change the visible columns when checked
  const onCheck = e => {
    const col = {name: e.target.name, text: e.target.value, view: e.target.checked}
    dispatch(updateIncomeCol(col));
  };

  return (
    <div className="">
      <p className={fancyText+"mb-4 text-center"}>Toggle Columns:</p>
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

IncomeColumnSelection.propTypes = {
  updateIncomeCol: PropTypes.func,
  columns:         PropTypes.array
}
export default IncomeColumnSelection;
