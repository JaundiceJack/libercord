import {
  GET_EXPENSES,
  ADD_EXPENSE,
  DELETE_EXPENSE,
  LOADING_EXPENSES,
  UPDATE_EXPENSE_COL
} from '../actions/types.js';

const initialState = {
  expenses: [],
  columns: [
    {name: 'name',     text: 'Name',     view: false},
    {name: 'category', text: 'Category', view: true},
    {name: 'location', text: 'Location', view: false},
    {name: 'value',    text: 'Paid',     view: true},
    {name: 'date',     text: 'When',     view: true}
  ],
  loading: false
}

const expenseReducer = (state = initialState, action) => {
  console.log(action.payload)
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
        expenses: state.expenses.filter(expense => expense._id !== action.payload)
      }
    case ADD_EXPENSE:
      return {
        ...state,
        expenses: [...state.expenses, action.payload]
      }
    case LOADING_EXPENSES:
      return {
        ...state,
        loading: true
      }
    case UPDATE_EXPENSE_COL:
      return {
        ...state,
        columns: state.columns.map(col => col.name === action.payload.name ? action.payload : col)
      }
    default:
      return state;
  }
};

export default expenseReducer;
