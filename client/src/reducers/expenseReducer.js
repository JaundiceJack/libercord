import {
  GET_EXPENSES,
  ADD_EXPENSE,
  SELECT_EXPENSE,
  EDIT_EXPENSE,
  DELETE_EXPENSE,
  LOADING_EXPENSES,
  UPDATE_EXPENSE_COL,
  SORT_EXPENSE,
} from '../actions/types.js';

const initialState = {
  expenses: [],
  selectedExpense: null,
  selectedRow: null,
  columns: [
    {name: 'value',    text: 'Spent',     view: true},
    {name: 'category', text: 'Category', view: true},
    {name: 'date',     text: 'When',     view: true},
    {name: 'location', text: 'Location', view: false},
    {name: 'name',     text: 'Item',     view: false}
  ],
  loading: false
}

const expenseReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_EXPENSES:
      return {
        ...state,
        expenses: action.payload,
        loading: false
      }
    case DELETE_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.filter(expense => expense._id !== action.payload),
        selectedExpense: null,
        selectedRow: null
      }
    case ADD_EXPENSE:
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
        selectedExpense: null,
        selectedRow: null,
      }
    case LOADING_EXPENSES:
      return {
        ...state,
        loading: true
      }
    case UPDATE_EXPENSE_COL:
      return {
        ...state,
        columns: state.columns.map(col =>
          col.name === action.payload.name ? action.payload : col)
      }
    case SELECT_EXPENSE:
      return {
        ...state,
        selectedExpense: action.payload.expense,
        selectedRow: action.payload.index
      }
    case EDIT_EXPENSE:
      return {
        ...state,
        expenses: [...state.expenses.filter(expense =>
          {return expense._id !== action.payload._id}), action.payload],
        selectedExpense: null,
        selectedRow: null,
      }
    case SORT_EXPENSE:
      return {
        ...state,
        selectedRow: null
      }
    default:
      return state;
  }
};

export default expenseReducer;
