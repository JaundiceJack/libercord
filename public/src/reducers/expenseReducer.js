import {
  EXPENSE_LIST_REQUEST,   EXPENSE_LIST_SUCCESS,   EXPENSE_LIST_FAILURE,
  EXPENSE_GET_REQUEST,    EXPENSE_GET_SUCCESS,    EXPENSE_GET_FAILURE,
  EXPENSE_CREATE_REQUEST, EXPENSE_CREATE_SUCCESS, EXPENSE_CREATE_FAILURE,
  EXPENSE_EDIT_REQUEST,   EXPENSE_EDIT_SUCCESS,   EXPENSE_EDIT_FAILURE,
  EXPENSE_DELETE_REQUEST, EXPENSE_DELETE_SUCCESS, EXPENSE_DELETE_FAILURE,
  EXPENSE_ERROR_RESET,    EXPENSE_DIRECT_SELECT,
  EXPENSE_TOGGLE_ADDING,  EXPENSE_TOGGLE_EDITING, EXPENSE_TOGGLE_DELETING,
  EXPENSE_TABLE_SORT
} from '../actions/types.js';


const initialState = {
  expenses: [],
  selected: null,
  loading: false,
  adding: false,
  editing: false,
  deleting: false,

  table: {
    sortBy: 'date',
    sortDirection: 'desc',
    selectedRow: null,
    columns: [
      {name: 'value',    text: 'Spent',    view: true},
      {name: 'category', text: 'Category', view: true},
      {name: 'date',     text: 'When',     view: true},
      {name: 'location', text: 'Location', view: false},
      {name: 'name',     text: 'Item',     view: false}
    ]
  }
}

const expenseReducer = (state = initialState, action) => {
  switch(action.type) {
    case EXPENSE_LIST_REQUEST:
    case EXPENSE_GET_REQUEST:
    case EXPENSE_CREATE_REQUEST:
    case EXPENSE_EDIT_REQUEST:
    case EXPENSE_DELETE_REQUEST:
      return { ...state, loading: true }
    case EXPENSE_LIST_FAILURE:
    case EXPENSE_GET_FAILURE:
    case EXPENSE_CREATE_FAILURE:
    case EXPENSE_EDIT_FAILURE:
    case EXPENSE_DELETE_FAILURE:
      return { ...state, loading: false, error: action.payload }
    case EXPENSE_LIST_SUCCESS:
      return { ...state, loading: false, expenses: action.payload }
    case EXPENSE_GET_SUCCESS:
      return { ...state, loading: false, selected: action.payload }
    case EXPENSE_CREATE_SUCCESS:
      return {
        ...state,
        // Add the new expense to the end
        expenses: [
          ...state.expenses,
           action.payload
         ],
        selected: action.payload,
        adding: false,
        loading: false
      }
    case EXPENSE_EDIT_SUCCESS:
      return {
        ...state,
        // Filter out the expense with the payload's id and add the edited one to the end
        expenses: [
          ...state.expenses.filter(expense => expense._id !== action.payload._id),
          action.payload
        ],
        selected: action.payload,
        editing: false,
        loading: false
      }
    case EXPENSE_DELETE_SUCCESS:
      return {
        ...state,
        // Filter out the expense with the payload's id
        expenses: [
          ...state.expenses.filter(expense => expense._id !== action.payload)
        ],
        selected: null,
        deleting: false,
        loading: false
      }
    case EXPENSE_TOGGLE_ADDING: return { ...state, adding: !state.adding }
    case EXPENSE_TOGGLE_EDITING: return { ...state, editing: !state.editing }
    case EXPENSE_TOGGLE_DELETING: return { ...state, deleting: !state.deleting }
    case EXPENSE_DIRECT_SELECT: return { ...state, selected: action.payload }
    case EXPENSE_TABLE_SORT:
      return {
        ...state,

        adding: false,
        editing: false,
        deleting: false
      }
    case EXPENSE_ERROR_RESET:
      return { ...state, error: null }
    default:
      return state;
  }
};

export default expenseReducer;
