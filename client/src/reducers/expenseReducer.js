import {
  GET_EXPENSES,
  ADD_EXPENSE,
  DELETE_EXPENSE,
  LOADING_EXPENSES
} from '../actions/types.js';

const initialState = {
  expenses: [],
  loading: false
}

export default (state = initialState, action) => {
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
    default:
      return state;
  }
}
