// Import basics
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
// Import server actions
import { getIncomes, selectIncome, sortedIncomes }
  from '../../../actions/incomeActions';
// Import the table preset
import TableA from '../tableTypeA';

const IncomeTable = (  ) => {
  // Make a dispatcher to access income actions
  const dispatch = useDispatch();
  // Retrieve the user's list of incomes from the server
  const income = useSelector( state => state.income );
  // Connect redux actions to a dispatch
  const select = ({ rowData, index }) => {
    dispatch(selectIncome(rowData, index)) };
  const sorted = ()  => {
    dispatch(sortedIncomes()) };
  // Format the income prices
  const formatted = income.incomes.map(inc => {
    return {...inc, value: "$"+inc.value};
  })

  return (
    <TableA
      data        = {formatted}
      cols        = {income.columns}
      selectedRow = {income.selectedRow}
      selectDatum = {select}
      userSorted  = {sorted}
    />
  )
};

// Define prop types
IncomeTable.propTypes = {
  income:        PropTypes.object,
  getIncomes:    PropTypes.func,
  selectIncome:  PropTypes.func,
  sortedIncomes: PropTypes.func
}
export default IncomeTable;
