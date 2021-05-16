import {
  GET_INCOMES,
  ADD_INCOME,
  SELECT_INCOME,
  EDIT_INCOME,
  DELETE_INCOME,
  LOADING_INCOMES,
  UPDATE_INCOME_COL,
  TOGGLE_INCOME_EDIT,
  TOGGLE_INCOME_DELETING,
  SORT_INCOME,
} from '../actions/types.js';
import { SortDirection } from 'react-virtualized';

const initialState = {
  incomes: [],
  loading: false,
  categories: [
    "Bond Interest",
    "Dividend",
    "Equipment Rental",
    "Gift",
    "Gig",
    "Inheritance",
    "Fulltime Job",
    "Parttime Job",
    "Loan Interest",
    "Lucky Find",
    "Real Estate Rental",
    "Real Estate Sale Profit",
    "Stimulus",
    "Welfare",
    "Other"
  ],
  columns: [
    {name: 'value',    text: 'Received',     view: true},
    {name: 'category', text: 'Category', view: true},
    {name: 'date',     text: 'When',     view: true},
    {name: 'source', text: 'Source', view: false},
  ],
  editing: false,
  deleting: false,
  sortBy: 'date',
  selectedRow: null,
  sortDirection: SortDirection.DESC,
  selectedIncome: null,
}

const incomeReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_INCOMES:
      return {
        ...state,
        incomes: action.payload,
        loading: false
      }
    case DELETE_INCOME:
      return {
        ...state,
        incomes: state.incomes.filter(income => income._id !== action.payload),
        selectedIncome: null,
        selectedRow: null
      }
    case ADD_INCOME:
      return {
        ...state,
        incomes: [...state.incomes, action.payload],
        selectedIncome: null,
        selectedRow: null
      }
    case LOADING_INCOMES:
      return {
        ...state,
        loading: true
      }
    case UPDATE_INCOME_COL:
      return {
        ...state,
        columns: state.columns.map(col =>
          col.name === action.payload.name ? action.payload : col)
      }
    case SELECT_INCOME:
      return {
        ...state,
        selectedIncome: action.payload.income,
        selectedRow:    action.payload.index
      }
    case EDIT_INCOME:
      return {
        ...state,
        incomes: [...state.incomes.filter(income =>
          {return income._id !== action.payload._id}), action.payload],
        selectedIncome: null,
        selectedRow: null,
      }
    case SORT_INCOME:
      return {
        ...state,
        selectedRow: null,
        sortDirection: state.sortDirection === SortDirection.DESC ?
          SortDirection.ASC : SortDirection.DESC,
        editing: false,
        deleting: false
      }
    case TOGGLE_INCOME_EDIT:
      return {
        ...state,
        editing: !state.editing
      }
    case TOGGLE_INCOME_DELETING:
      return {
        ...state,
        deleting: !state.deleting
      }
    default:
      return state;
  }
};

export default incomeReducer;
